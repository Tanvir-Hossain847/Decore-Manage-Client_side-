import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../Components/ServiceCard';

const Services = () => {
    const axiosSecure = useAxiosSecure() 
    const { data: services = [], refetch } = useQuery({
        queryKey: ['myServices'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services`)
            return res.data
        }
    })
    console.log(services);
    
    return (
        <div className='bg-white py-15 space-y-10'>
            <h1 className='text-center font-bold text-4xl text-black'>Our Services</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 w-11/12 mx-auto">
            {
                services.map(service =>
                     <ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
        </div>
    );
};

export default Services;