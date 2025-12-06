import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/root';
import Home from '../Pages/Home';
import Registration from '../Pages/Register';
import Login from '../Pages/Login';
import Coverage from '../Pages/Coverage';
import Services from '../Pages/Services';

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    errorElement:<p>Add Firebase</p>,
    children: [
        {
            index: true,
            path:'/',
            element:<Home></Home>,
            loader: () => fetch("/services.json").then(res => res.json())
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>
        },
        {
          path: '/services',
          element: <Services></Services>
        }
       
    ]
  },
]);
