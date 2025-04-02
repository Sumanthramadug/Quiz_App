import React from 'react'
import { createContext,useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext = createContext();
export const AppContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(false);
    const getUserData = async() => {
        try{
            const {data} = await axios.get('https://quiz-app-4-06sl.onrender.com/api/auth/getDetails',{},{withCredentials:true});
            if(data.success){
                setUserData(data.message);
            } 
            else{
                toast.error("hey err");
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    const value={
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData
    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}
