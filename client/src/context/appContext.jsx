import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

import {useAuth} from '@clerk/clerk-react'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit,setCredit] = useState(false)
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const {getToken } = useAuth()
    const loadCreditsData = async () =>{
        try {
             console.log("loadCreditsData called");
            const token  = await getToken()
            console.log("Token:", token);
            const {data} = await axios.get(`${backendURL}/api/user/credits`,{headers:{token}})
            console.log("full data:", data);
            console.log("success value:", data.success);
            console.log("credits value:", data.credits);
            
            if(data.success){
                console.log('inside try block')

                setCredit(data.credits)
                console.log(data.credits);

            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
    const value = {
        credit,setCredit,
        loadCreditsData,
        backendURL
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider