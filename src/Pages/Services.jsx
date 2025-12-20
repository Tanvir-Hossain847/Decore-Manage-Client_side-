import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ServiceCard from '../Components/ServiceCard';
import { LucideAirplay, LucideSearch, ChevronLeft, ChevronRight } from 'lucide-react';
import Loder from '../Components/Loder';



const Services = () => {

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('asc')
    const [category, setCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)


    const axiosSecure = useAxiosSecure()
    const { isLoading, data: services = [], refetch } = useQuery({
        queryKey: ['myServices'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services`);
            return res.data
        }
    })
    console.log(services);
    if(isLoading){
        return <Loder></Loder>
    }

    const categories = [...new Set(services.map(service => service.category))]

    const filteredService = services.filter(service => service.service_name.toLowerCase().includes(search.toLowerCase())
    )
    
    const categoryService = filteredService.filter(service => category ? service.category.toLowerCase() === category.toLowerCase() : true)
    
    const sortService = categoryService.sort((a,b) => {
        if (sort === "Price: Low - High")return a.cost - b.cost
        if (sort === "Price: High - Low")return b.cost - a.cost
    })

    // Pagination logic (for display only - all data shown on page 1)
    const itemsPerPage = 9
    const totalPages = Math.ceil(sortService.length / itemsPerPage)
    const displayedServices = sortService // Show all services regardless of pagination


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
                    displayedServices.map(service =>
                        <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>

            {/* Pagination Component */}
            <div className="flex justify-center items-center mt-12 mb-8">
                <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                            currentPage === 1 
                                ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                                : 'border-[#628141] text-[#628141] hover:bg-[#628141] hover:text-white'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 mx-4">
                        {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                            const pageNumber = index + 1
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`w-10 h-10 rounded-lg border transition-all duration-300 font-semibold ${
                                        currentPage === pageNumber
                                            ? 'bg-[#628141] text-white border-[#628141]'
                                            : 'border-gray-300 text-gray-700 hover:border-[#628141] hover:text-[#628141]'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}
                        
                        {totalPages > 5 && (
                            <>
                                <span className="px-2 text-gray-500">...</span>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`w-10 h-10 rounded-lg border transition-all duration-300 font-semibold ${
                                        currentPage === totalPages
                                            ? 'bg-[#628141] text-white border-[#628141]'
                                            : 'border-gray-300 text-gray-700 hover:border-[#628141] hover:text-[#628141]'
                                    }`}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Next Button */}
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                            currentPage === totalPages 
                                ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                                : 'border-[#628141] text-[#628141] hover:bg-[#628141] hover:text-white'
                        }`}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Pagination Info */}
            <div className="text-center text-gray-600 mb-8">
                <p className="text-sm">
                    Showing <span className="font-semibold text-[#628141]">{displayedServices.length}</span> of{' '}
                    <span className="font-semibold text-[#628141]">{sortService.length}</span> services
                    {totalPages > 1 && (
                        <span> • Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span></span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Services;