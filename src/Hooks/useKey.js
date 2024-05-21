import {useEffect} from "react";
import {key} from "../App";

export function useKey(key,action){
    useEffect(() => {
        const callBack=(e)=>{
            if (e.code.toLowerCase()===key.toLowerCase()){
                action()
            }
        }
        document.addEventListener(`keydown`,callBack)
        return function (){
            document.removeEventListener('keydown',callBack)
        }
    }, [action,key]);
}

