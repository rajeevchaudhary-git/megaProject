import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "../src/store/store.js"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import {AuthLayout, Login, Signup} from "./components"
import AllPOst from './components/pages/AllPOst.jsx'
import AddPost from './components/pages/AddPost.jsx'
import EditPOst from './components/pages/EditPOst.jsx'
import Post from './components/pages/Post.jsx'
const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
     children: [
         {
             path: "/",
             element: <Home />,
         },
         {
             path: "/login",
             element: (
                 <AuthLayout authentication={false}>
                     <Login />
                 </AuthLayout>
             ),
         },
         {
             path: "/signup",
             element: (
                 <AuthLayout authentication={false}>
                     <Signup />
                 </AuthLayout>
             ),
         },
         {
             path: "/all-posts",
             element: (
                 <AuthLayout authentication>
                     {" "}
                     <AllPOst/>
                     </AuthLayout>
             ),
         },
         {
             path: "/add-post",
             element: (
                 <AuthLayout authentication>
                     {" "}
                     <AddPost/>
                 </AuthLayout>
             ),
         },
         {
             path: "/edit-post/:slug",
             element: (
                 <AuthLayout authentication>
                     {" "}
                    <EditPOst/>
                 </AuthLayout>
             ),
         },
         {
             path: "/post/:slug",
             element: <Post/>,
         },
     ],
 },
 ])
 
 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <Provider store={store}>
     <RouterProvider router={router}/>
     </Provider>
   </React.StrictMode>,
 )
