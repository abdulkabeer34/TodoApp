import type { TableColumnsType } from "antd";
import { TableDetailsType } from "../Types";


export const TableColumns :TableColumnsType<TableDetailsType> = [
    {title:"Name",dataIndex:"name",key:"name"},
    {title:"Done",dataIndex:"done",key:"done"},
    {title:"Edit",dataIndex:"edit",key:"edit"},
    {title:"Delete",dataIndex:"delete",key:"delete"},
 ]
 
 
export const AntdTheme = {
  token: {
    colorPrimary: '#000', 
  },
}; 