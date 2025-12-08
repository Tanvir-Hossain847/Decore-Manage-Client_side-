import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/root';
import Home from '../Pages/Home';
import Registration from '../Pages/Register';
import Login from '../Pages/Login';
import Coverage from '../Pages/Coverage';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Services from '../Pages/Services';
import PackageDetail from '../Pages/PackageDetail';
import AuthLayout from '../Layouts/AuthLayout';
import DashBoardLayout from '../Layouts/DashBoardLayout';
import My_Bookings from '../Pages/My_Bookings';

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
            loader: () => fetch("http://localhost:3000/services").then(res => res.json())
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>
        },
        {
          path: '/services',
          element: <Services></Services>
        },
        {
          path: '/package/:id',
          element: <PackageDetail></PackageDetail>
        },
        {
          path: '/services/:id',
          element: <PackageDetail></PackageDetail>,
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/contact',
          element:<Contact></Contact>
        },
       
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>,
      },
      {
        path: '/auth/register',
        element: <Registration></Registration>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
      {
        path: '/dashboard/mybookings',
        element: <My_Bookings></My_Bookings>
      }
    ]
  }
]);
