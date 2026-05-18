import React from 'react'
import ReactDOM from 'react-dom/client'

import "./styles/global.css"
import AppLayout from './layout'

import {
  createBrowserRouter,RouterProvider,
} from "react-router"
import HomePage from './page/home.page'
import UserPage from './page/user.page'
import BlogPage from './page/blog.page'
const router = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children : [
      {
        //index : true : lay duong link "/"
        index:true,element:<HomePage/>
      },
      {
        path : "users",
      element : <UserPage/>
      },
      {
        path : "blogs",
      element : <BlogPage/>
      }
    ]
  },


])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
