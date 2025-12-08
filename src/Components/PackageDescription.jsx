import { CheckCircle, X } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const PackageDescription = ({service, packageData}) => {
const { category, cost, description, image, rating, reviewCount, service_name, short_description } = service;
    return (
        <div className="">
        <div  className="">
            <div className="lg:col-span-4 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-md p-8"
                >
                    <h2 className="text-2xl font-bold text-primary mb-4">About This Package</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{short_description}</p>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-md p-8"
                >
                    <h2 className="text-2xl font-bold text-primary mb-6">Package Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {packageData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* What's Included / Not Included */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-md p-8"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Included */}
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4">What's Included</h3>
                            <ul className="space-y-3">
                                {packageData.included.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Not Included */}
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4">Not Included</h3>
                            <ul className="space-y-3">
                                {packageData.notIncluded.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                        <span className="text-gray-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Gallery
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl shadow-md p-8"
                            >
                                <h2 className="text-2xl font-bold text-primary mb-6">Gallery</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {packageData.images.map((image, index) => (
                                        <div key={index} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
                                            <img
                                                src={image}
                                                alt={`Gallery ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div> */}
            </div>
        </div>
        </div>
    );
};

export default PackageDescription;