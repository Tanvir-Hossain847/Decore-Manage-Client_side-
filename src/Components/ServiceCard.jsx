import React from 'react';
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

const ServiceCard = ({service, index}) => {
    return (
        <div>
             <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden group cursor-pointer transition-all duration-300"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img src={service.image} alt={service.service_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute top-3 right-3 bg-[#EBD5AB] px-3 py-1.5 rounded-full text-xs font-semibold text-[#1B211A]">
                                            {service.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold mb-2 text-[#1B211A]">{service.service_name}</h3>
                                        <div className="flex items-center mb-3">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="ml-1 text-[#1B211A] font-semibold text-sm">{service.rating}</span>
                                            <span className="ml-1 text-gray-500 text-xs">(120+ reviews)</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xl font-bold text-[#628141]">৳{service.cost}</span>
                                                <span className="text-gray-500 text-xs ml-1">onwards</span>
                                            </div>
                                            <button className="bg-[#628141] text-white px-5 py-2 rounded-full hover:bg-[#1B211A] transition-colors font-semibold text-sm">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
        </div>
    );
};

export default ServiceCard;