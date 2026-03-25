import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

import {useAuth, useClerk, useUser} from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [credit,setCredit] = useState(false)
    const [image,setImage] = useState(false)
    const [resultImage,setResultImage] = useState(false)

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

    const {getToken } = useAuth()
    const {isSignedIn} = useUser()
    const {openSignIn} = useClerk()


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


    const removeBg = async(image)=>{
        try {
            if(!isSignedIn){
                return openSignIn()
            }
            setImage(image)
            setResultImage(false)

            navigate('/result')

            const token = await getToken()
            const formData = new FormData()
            image && formData.append('image',image)

            const {data} = await axios.post(backendURL+'/api/image/remove-bg',formData,{headers:{token}})

            if(data.success){
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            }
            else{
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }

            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const value = {
    credit, setCredit,
    loadCreditsData,
    backendURL,
    image, setImage,
    resultImage, setResultImage,
    removeBg
}
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider