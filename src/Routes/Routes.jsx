import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import Medicine from "../pages/Medicine/Medicine";

import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";

import Profile from "../pages/Dashboard/Profile/Profile";
import AppointmentList from "../pages/Dashboard/AppointmentList/AppointmentList";
import Overview from "../pages/Dashboard/Overview/Overview";
import Login from "../pages/Login/Login";
import SignUp from "../component/SignUp/SignUp";
// import SignUp from "../pages/SignUp/SignUp";





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
            path:"medicine",
            element:<Medicine></Medicine>
        },
        {
         path:'login',
         element:<Login></Login>
        }
      ,
      {
      path:'signup',
      element:<SignUp></SignUp>
      },
        {
          path:"dashboard",
          element:<Dashboard></Dashboard>,

          children:[
            {
              path:"overview",
              element:<Overview></Overview>
            },
            {
              path:'profile',
              element:<Profile></Profile>
            },
            {
              path:'appointmentList',
              element:<AppointmentList></AppointmentList>
            },
          ]
        }
  
      ]
    },
  ]);
  
