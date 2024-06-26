import React from 'react'
import { Modal } from "antd"
import { AntdModalProps } from '../Types'

export const AntdModal:React.FC<AntdModalProps> = ({children,...restProps}) => {
  return (
    <Modal {...restProps}>
        {children}
    </Modal>
  )
}
