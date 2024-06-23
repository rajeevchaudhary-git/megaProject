import React from 'react';
import { useDispatch } from 'react-redux';
import authServices from '../appwrite/auth';
import { logout } from '../store/authSlice';
function LogoutBtn() {
    const dispatch = useDispatch();
    const logouthandler=()=>{
        authServices.logout().then(()=>{
            dispatch(logout())
        }).catch((err)=>{console.log(err)})
    }
  return (
   <button onClick={logouthandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>LogOut</button>
  )
}

export default LogoutBtn
