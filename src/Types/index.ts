import { ModalProps } from "antd";
import { TodoTypes } from "../store/TodoMobx";
import { ReactNode } from "react";

export interface ModalDetailsTypes extends ModalProps{
    details: TodoTypes;
    index:number;
  }


export interface AntdModalProps extends ModalProps{
    children:React.ReactNode
  }
  

  export interface TableDetailsType{
    id:number;
    key:React.Key;
    name:string;
    done: ReactNode;
    delete:ReactNode;
    edit:ReactNode;
    fullDescription:string;
  }  