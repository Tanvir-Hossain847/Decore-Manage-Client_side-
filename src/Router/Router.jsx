import React from 'react';
import { createBrowserRouter } from 'react-router';
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
import MyProfile from '../Pages/MyProfile';
import Root from '../Layouts/Root';
import Error from '../Pages/Error';
import Payment from '../Pages/Payment';
import Payment_secces from '../Pages/Payment_secces';
import Payment_Cancel from '../Pages/Payment_Cancel';
import PaymentHistory from '../Pages/PaymentHistory';

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
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
    path: '*',
    element:<Error></Error>
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
      },
      {
        path: '/dashboard/myprofile',
        element: <MyProfile></MyProfile>
      },
      {
        path: '/dashboard/paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: '/dashboard/payments/:id',
        element: <Payment></Payment>
      },
      {
        path: '/dashboard/payment-success',
        element: <Payment_secces></Payment_secces>
      },
       {
        path: '/dashboard/payment-canceled',
        element: <Payment_Cancel></Payment_Cancel>
      }
    ]
  }
]);
