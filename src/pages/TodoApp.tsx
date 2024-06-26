import { useState } from "react";
import { observer } from "mobx-react-lite";
import {motion} from 'framer-motion'
import { Button,ConfigProvider, Table, message } from "antd";
import { EditModal } from "../components/EditModal";
import { TableDetailsType } from "../Types";
import { AntdTheme, TableColumns } from "../Constants";
import { useStore } from "../store/store";




const TodoApp = observer(() => {
  const [input, setInput] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);
  const [index,setIndex]  = useState<number>(0);

  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: 'error',
      content: 'Cannot Add The Same Todo Twice',
    });
  };

  const store = useStore();



  const TableData :TableDetailsType[] = store.todos.map(({name,done,toggle},index)=>({
    key:index,
    name: name.length>10 ? name.slice(0,10) + "...." :name ,
    fullDescription: name,
    done:<div onClick={toggle} className="cursor-pointer">{done?"Done":"Not Done"}</div>,
    delete:<a onClick={()=>store.deleteTodo(index)}>Delete</a>,
    edit:<Button onClick={()=>{setIndex(index);setOpen(true)}}>Edit</Button>
  }))

  const closeModal = ()=>{
    setOpen(false);
    setIndex(-1);
  } 

  const AddTodo = () => {
    for (let todo of store.todos) {
      if (todo.name === input) {
        warning();
        return;
      }
    }
    input && store.addTodo(input), setInput("");
  };

  return (
      <ConfigProvider theme={AntdTheme}>
        {contextHolder}
        <EditModal details={store.todos[index]} index = {index} centered open={open} onClose={closeModal}  onCancel={closeModal}/>
    <div className="flex items-center mt-7  h-screen flex-col ">
      <div className="w-full flex flex-col items-center">
      <motion.h1 className="text-4xl">My Todo App</motion.h1>
      <div className="input-area w-full flex items-center justify-center mt-8">
        <input
          onKeyDown={(e) => e.key === "Enter" && AddTodo()}
          className="border-zinc-800  mr-6 rounded-lg border-2  p-2 w-1/3"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
        <Button 
          onClick={AddTodo}
          className="text-white bg-black w-24 h-10"
          >
          Add Todo
        </Button>
        </div>
      </div>
      <Table columns={TableColumns} className="w-[70%] mt-9" dataSource={TableData} expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.fullDescription}</p>,
      }}/>
    </div>
         </ConfigProvider>
  );
});

export default TodoApp;
