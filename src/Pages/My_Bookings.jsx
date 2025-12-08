import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { LucideEdit, LucideX } from 'lucide-react';

const My_Bookings = () => {

    const axiosSecure = useAxiosSecure()
    const { data: booking = [], refetch } = useQuery({
        queryKey: ['myBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking`);
            return res.data
        }
    })
    console.log(booking);

    // const { additionalNotes, bookingDate, createdAt, location, packageId, packagePrice, packageTitle, status, userEmail, userName, _id } = booking

    // additionalNotes
    // :
    // "Fugiat consequatur "
    // bookingDate
    // :
    // "2025-12-12"
    // createdAt
    // :
    // "2025-12-07T18:30:52.215Z"
    // location
    // :
    // "Atque proident iust"
    // packageId
    // :
    // "693447d6409bf48e4effe9e7"
    // packagePrice
    // :
    // 12000
    // packageTitle
    // :
    // "Wedding Stage Decoration"
    // status
    // :
    // "pending"
    // userEmail
    // :
    // "tanvirhossaintufa@gmail.com"
    // userName
    // :
    // "Tanvir Hossain"
    // _id
    // :
    // "6935c7dc798394303dbb90c0"

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Service Name</th>
                            <th>Service ID</th>
                            <th>Cost</th>
                            <th>Location</th>
                            <th>Payment</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((bookings, index) =>
                                <tr key={bookings._id}>
                                    <th>{index + 1}</th>
                                    <td>{bookings.userName}</td>
                                    <td>{bookings.userEmail}</td>
                                    <td>{bookings.packageTitle}</td>
                                    <td>{bookings.packageId}</td>
                                    <td>{bookings.packagePrice}</td>
                                    <td>{bookings.location}</td>
                                    <td><button className='btn btn-xs btn-secondary hover:scale-105 transition-all duration-200'>Pay</button></td>
                                    <td className='badge bg-gray-500 text-white'>{bookings.status}</td>
                                    <td className='space-x-1.5'>
                                        <button className='btn btn-xs p-1 hover:scale-105 transition-all duration-200 btn-secondary'><LucideEdit></LucideEdit></button>
                                        <button className='btn btn-xs p-1 hover:scale-105 transition-all duration-200 bg-red-500 text-white'><LucideX></LucideX></button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default My_Bookings;