import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import Medicine from "../pages/Medicine/Medicine";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import OverView from "../pages/Dashboard/OverView/OverView";
import Profile from "../pages/Dashboard/Profile/Profile";
import AppointmentList from "../pages/Dashboard/AppointmentList/AppointmentList";




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
          path:"login",
          element:<Login></Login>,

        },
        {
          path:"signup",
          element:<SignUp></SignUp>
        },
        {
          path:"dashboard",
          element:<Dashboard></Dashboard>,
          children:[
            {
              path:"overview",
              element:<OverView></OverView>
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
  
