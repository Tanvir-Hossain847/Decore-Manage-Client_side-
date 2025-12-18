import { LucideArrowBigLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='grid place-content-center min-h-screen text-center space-y-2'>
            <img className='w-2/3 mx-auto' src="https://i.ibb.co.com/GfW3RsGB/20945097.jpg" alt="" />
            <h1 className='font-bold text-5xl'>Access Forbidden</h1>
            <h1 className='font-bold text-lg'>Please Contact Support</h1>
            <Link to={'/'}><button className='btn btn-secondary'><LucideArrowBigLeft></LucideArrowBigLeft>Go Back</button></Link>
        </div>
    );
};

export default Forbidden;