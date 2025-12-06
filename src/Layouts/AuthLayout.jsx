import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-linear-to-br from-accent/20 via-white to-secondary/10'>
            <div className="w-11/12 mx-auto py-5">
            <div className="flex justify-self-center">
                <Logo></Logo>
            </div>
            <div className="">
                <Outlet></Outlet>
            </div>
            </div>
        </div>
    );
};

export default AuthLayout;