import { store } from "./TodoMobx";
import React ,{createContext,ReactNode , useContext} from "react";


const StoreContext = createContext(store)

export const StoreProvider :React.FC<{children:ReactNode}> = ({children})=>{
    return  <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
}


export const useStore = ()=> useContext(StoreContext)

