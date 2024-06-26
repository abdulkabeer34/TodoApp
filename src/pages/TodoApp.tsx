import { useState } from "react";
import { observer } from "mobx-react-lite";
import {motion} from 'framer-motion'
import { Button,ConfigProvider, Table, message } from "antd";
import { EditModal } from "../components/EditModal";
import { TableDetailsType } from "../Types";
import { AntdTheme, TableColumns } from "../Constants";
import { useStore } from "../store/store";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";




const TodoApp = observer(() => {
  const [input, setInput] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false);
  const [index,setIndex]  = useState<number>(0);

  const [messageApi, contextHolder] = message.useMessage();
  const store = useStore();


  const TableData :TableDetailsType[] = store.todos.map((item,index)=>({...item,id:index})).filter(item=>item.name.startsWith(input)).map(({name,done,toggle,id},index)=>{
    return {
      id,
      key:index,
      name: name.length>10 ? name.slice(0,10) + "...." :name ,
      fullDescription: name,
      done:<div onClick={toggle} className="cursor-pointer">{done?"Done":"Not Done"}</div>,
      delete:<a className="flex items-center gap-3 text-red-500 justify-center hover:text-red" onClick={()=>store.deleteTodo(id)}>Delete <FaRegTrashCan /></a>,
      edit:<Button className="flex items-center gap-3 justify-center" onClick={()=>{setIndex(index);setOpen(true)}}>Edit<MdModeEdit />
      </Button>
    }
})



  
  const warning = (message:string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };


  const closeModal = ()=>{
    setOpen(false);
    setIndex(-1);
  } 

  const AddTodo = () => {
    if(!input.length || input.length < 5){
      warning('Enter atleast 5 characters');
      return;
    }

    for (let todo of store.todos) {
      if (todo.name === input) {
        warning('Cannot Add The Same Todo Twice');
        return;
      }
    }
    input && store.addTodo(input);
  };

  return (
      <ConfigProvider theme={AntdTheme}>
        {contextHolder}
        <EditModal details={store.todos[index]} index = {index} centered open={open} onClose={closeModal}  onCancel={closeModal}/>
    <div className="flex items-center mt-5  h-screen flex-col ">
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
      <Table pagination={{pageSize:5}} columns={TableColumns} className="w-[70%] mt-9" dataSource={TableData} expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.fullDescription}</p>,
      }}/>
    </div>
         </ConfigProvider>
  );
});

export default TodoApp;
