import axios from "axios";
import { useEffect } from "react";
import {createContext, useContext, useState} from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    
    const [auth,setAuth] = useState({
        userId : "",
        token : ""
    });
    axios.defaults.headers.common.Authorization= auth?.token;
const api = "http://localhost:8000/api/v1"
useEffect(()=>{
    const data = localStorage.getItem("auth");
    if(data){
        const parseData = JSON.parse(data);
        setAuth({
            userId : parseData.userId,
            token : parseData.token
        })
    }
 },[]
)
const [data,setData] = useState([])
  const [filtered, setFiltered] = useState([]);
    return (
        <AuthContext.Provider value={{auth,setAuth,api,data,setData,filtered, setFiltered}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const val = useContext(AuthContext);
    if(!val) throw new Error("auth is not available")
        return val;
}