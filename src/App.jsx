import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth";
import { login,logout } from "./store/authSlice";
import {Header,Footer } from "../src/components/index";
import { Outlet } from "react-router-dom";
import Post_form from "./components/container/Post-from.jsx/Post_form";

function App() {
// console.log(import.meta.env.VITE_APPWRITE_URL);
const [loading,setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(()=>{
authServices.getCurrentUser()
.then((userdata)=>{
  if(userdata){
    dispatch(login({userdata}))
  }
  else{
    dispatch(logout())
  }
})
.catch((error)=>{
  console.log("error occured during login..".error);
})
.finally(()=>setLoading(false))
},[]);


  return !loading ?(
    <div className="min-h-screen   content-between ">
      <div className="w-full-block">
        <Header/>
       <main>
        <Outlet/>
       </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App
