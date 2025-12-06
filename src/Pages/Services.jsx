import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../Components/ServiceCard';
import { LucideAirplay, LucideSearch } from 'lucide-react';



const Services = () => {

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('asc')
    const [category, setCategory] = useState('')


    const axiosSecure = useAxiosSecure()
    const { data: services = [], refetch } = useQuery({
        queryKey: ['myServices'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services`);
            return res.data
        }
    })
    console.log(services);

    const categories = [...new Set(services.map(service => service.category))]

    const filteredService = services.filter(service => service.service_name.toLowerCase().includes(search.toLowerCase())
    )
    
    const categoryService = filteredService.filter(service => category ? service.category.toLowerCase() === category.toLowerCase() : true)
    
    const sortService = categoryService.sort((a,b) => {
        if (sort === "Price: Low - High")return a.cost - b.cost
        if (sort === "Price: High - Low")return b.cost - a.cost
    })


    return (
        <div className='bg-white py-15 space-y-10'>
            <h1 className='text-center font-bold text-4xl text-black'>Our Services</h1>
            <div className="flex flex-row-reverse items-center justify-between w-11/12 mx-auto">
                <div className="flex items-center ">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input w-95"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <LucideSearch className='-ms-10 z-0 mr-5'></LucideSearch>
                </div>
                <div className="flex items-center gap-5">
                    <fieldset className="fieldset">
                        <select defaultValue="sort" className="select" onChange={(e) => {
                            setSort(e.target.value)
                        }}>
                            <option disabled={true}>Sort</option>
                            <option>Price: Low - High</option>
                            <option>Price: High - Low</option>
                        </select>
                     
                    </fieldset>
                    <fieldset className="fieldset">
                        <select defaultValue="Category" className="select" value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option disabled={true}>Category</option>
                            {categories.map((category, index) => <option key={index}>
                                {category}
                            </option>)}
                        </select>
                     
                    </fieldset>
                </div>
                
                
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 w-11/12 mx-auto">
                {
                    sortService.map(service =>
                        <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;