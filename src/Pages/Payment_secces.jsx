import React from 'react';
import { Link } from 'react-router';

const Payment_secces = () => {
    return (
        <div className='text-center grid place-content-center min-h-screen py-15 bg-base-300'>
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWg0dWRvcGJoaTRydW05ajB6Ym5ic2lsajExcG5tZWRlbjhvbmw5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/95EJPVZHiKcp6Tg69k/giphy.gif" alt="" />
            <h1 className='text-3xl text-center font-bold my-5'>Congratulations, <span className='text-success'>Payment Succesful</span></h1>
            <Link to={'/dashboard/mybookings'}><button className='btn btn-success text-white'>Go Back</button></Link>
        </div>
    );
};

export default Payment_secces;