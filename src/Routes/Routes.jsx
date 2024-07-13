import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import Medicine from "../pages/Medicine/Medicine";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[

        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/medicine",
            element:<Medicine></Medicine>
        },
  
      ]
    },
  ]);
  
