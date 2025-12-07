import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Users } from 'lucide-react';


const PackegeBanner = ({service, packageData}) => {
const { category, image, rating, reviewCount, service_name } = service;
    return (
        <div>
            <section className="relative h-[60vh] overflow-hidden">
                <img
                    src={image}
                    alt={service_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block mb-4">
                                <span className="px-4 py-2 bg-accent text-primary rounded-full text-sm font-semibold">
                                    {category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {service_name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="font-semibold">{rating}</span>
                                    <span className="text-gray-200">({reviewCount} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{packageData.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span>{packageData.capacity}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PackegeBanner;