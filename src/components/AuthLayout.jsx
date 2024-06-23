import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import React,useEffect from 'react'

function AuthLayout({children ,authentication=true}) {
    const navigate = useNavigate();
    const [loader,setloader] = useState(true);
    const authstatus = useSelector(state=>state.auth.status);

    useEffect(()=>{
      if(authentication && authstatus!==authentication){
        navigate("/login");
      }
      else if(!authstatus && authstatus!==authentication){
        navigate("/");
      }
      setloader(false);
    },[authstatus,navigate,authentication])
  return loader ? <h1>loading..</h1> : <>{children}</>
}

export default AuthLayout
