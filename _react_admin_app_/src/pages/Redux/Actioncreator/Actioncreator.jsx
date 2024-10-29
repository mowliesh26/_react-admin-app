
import { LOGIN, PRIVATEROUTE, REMOVELOCALSTORAGE } from "../ActionType/ActionType"
export const login=(data)=>{
    console.log("data",data);
    
    return{
        type:LOGIN,
        payload:data
    }
}
 
export const Privateroute=(data)=>{
    return{
        type:PRIVATEROUTE,
        payload:data
        
    }
}

export const removeLocalStorage=()=>{
    return{
        type:REMOVELOCALSTORAGE
        
    }
}
 