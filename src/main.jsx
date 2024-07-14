import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './Routes/Routes';
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthProvider';
// import AuthProvider from './Provider/AuthProvider';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
       {/* <QueryClientProvider client={QueryClient}> */}
       <AuthProvider>

        <div className="max-w-screen-xl mx-auto">
                <RouterProvider router={router} />
              </div>

</AuthProvider>
{/* </QueryClientProvider> */}
  </React.StrictMode>,

)
