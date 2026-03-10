import { useState,useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../pages/NavBar.css"
import {whoami,logout} from "../users"

export default function Home() {
   const navigate = useNavigate() 
   const [user, setUser] = useState(null)
   const [userError, setUserError] = useState(null)
   console.log(userError);
   //console.log(user);
   useEffect(()=>{
    async function load() {
        const data = await whoami()
        console.log(data);
        if (!data?.error) {
            setUser(data)
        }
        setUserError(data.error)

    }
    load()
   }, [])
    
   async function onLogout() {
    const data = await logout()
    if (data.error) {
        return setUserError(data.error)
    }
    setUser(null)
    navigate('/')
   }
    return (
       <div >
            <NavBar user={user} onLogout ={onLogout}></NavBar>

            {userError && <div className='alert alert-danger text-center my-2'>{userError}</div>}
       </div>
        
    )
}