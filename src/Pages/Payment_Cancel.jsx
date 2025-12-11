import React from 'react';
import { Link } from 'react-router';

const Payment_Cancel = () => {
    return (
        <div className='text-center grid place-content-center min-h-screen space-y-5'>
            <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3p4ZXBjdWczdHhtYWN0YWVvbnVlbTI0czlibnpwOXNnc3YxOGd1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YTzh3zw4mj1XpjjiIb/giphy.gif" alt="" />
            <h1 className='text-red-500 text-2xl text-center'><span className='text-black'>OOPs!</span> Payment Canceled</h1>
            <Link to={'/dashboard/mybookings'}><button className='btn btn-success text-white'>Go Back</button></Link>
        </div>
    );
};

export default Payment_Cancel;