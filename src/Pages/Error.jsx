import { LucideArrowBigLeft, LucideArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex'>
            <div className="">
                <img className='w-full h-screen object-cover' src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <div className="flex-1 min-h-screen w-full bg-black/75 text-white text-center grid place-content-center space-y-3">
            <h1 className='text-5xl font-bold '>404 Not Found</h1>
            <p className='text-xl'>The Page You Are Looking For Is Not Found</p>
            <Link to={'/'} className='btn bg-red-500 text-white w-40 mx-auto hover:scale-110 transition-all duration-200'><LucideArrowLeft></LucideArrowLeft>Go Back</Link>
            </div>
        </div>
    );
};

export default Error;