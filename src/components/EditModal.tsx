import { Input} from 'antd'
import React, { useEffect, useState } from 'react'
import { AntdModal } from './AntdModal'
import { ModalDetailsTypes } from '../Types';


export const EditModal:React.FC<ModalDetailsTypes> = ({details,index,...restProps}) => {
  const  [value,setValue] = useState<string>(details?.name)

  useEffect(()=>{
    setValue(details?.name)
    return ()=>setValue("");
  },[index,details?.name])

  return (
    <AntdModal 
    {...restProps}
    title="Edit The Task"
    okText="Save It"
    onOk={()=>details.setName(value)}
    >
      <Input  className="mt-3" value={value} onChange={e=>setValue(e.target.value)}/>
    </AntdModal>
  )
}
