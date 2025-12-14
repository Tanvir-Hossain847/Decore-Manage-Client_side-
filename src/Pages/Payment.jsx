import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Loder from '../Components/Loder';
import { motion } from 'framer-motion';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const Payment = () => {
    const { id } = useParams()
    const [paymentData, setPaymentData] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        fetch(`http://localhost:3000/booking/${id}`)
            .then(res => res.json())
            .then((data) => setPaymentData(data))
    }, [id])

    if (!paymentData) {
        return <Loder></Loder>
    }
    console.log(paymentData);

    const { bookingDate, packageId, packagePrice, packageTitle, location, userName, userEmail, _id } = paymentData;
    
    const handlePayment = async() => {
        const paymentInfo = {
            cost: packagePrice,
            serviceName: packageTitle,
            email: userEmail,
            packageId: packageId,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data);
        window.location.href = res.data.url
    }

    return (
        <motion.div
        initial={{x:1000}}
        animate={{x:0}}
        transition={{duration: 0.6}}
        >
            <h1 className='text-3xl font-bold p-5 text-center'>Payment Page</h1>
            <div className="p-10 min-h-100 mx-auto w-100 lg:w-2/4 bg-white border-y-5 border-secondary shadow-2xl my-10">
                <div className="space-y-3 text-lg font-bold gap-5">
                    <div className="space-y-5">
                        <h1>Package:  {packageTitle}</h1>
                        <h1>ID:  {packageId}</h1>
                    </div>
                    <div className="space-y-2">
                        <p>Date:  {bookingDate}</p>
                        <p>Location:  {location}</p>
                    </div>
                </div>
                <div className="space-y-5 my-4 text-lg font-bold gap-5">
                    <div className="space-y-2">
                        <h1>Name:  {userName}</h1>
                        <p>Email:  {userEmail}</p>
                    </div>
                    <div className="">
                        <h1 className='badge badge-secondary badge-xl'>
                            Cost:  ৳{packagePrice}
                        </h1>
                    </div>
                </div>
                <div className="">
                    <button onClick={handlePayment} className='btn btn-secondary w-full'>Pay ৳{packagePrice}</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Payment;