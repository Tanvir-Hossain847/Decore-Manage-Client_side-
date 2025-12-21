import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, CheckCircle, Shield, DollarSign, Award, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';
import ServiceCard from '../Components/ServiceCard';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loder from '../Components/Loder';

const Home = () => {


    const services = useLoaderData()
    const featuredServices = services.slice(0,6)
    const [topDecorators, setTopDecorators] = useState()


    const [categories] = React.useState([
        { id: 1, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400', icon: '🏠' },
        { id: 2, name: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', icon: '💒' },
        { id: 3, name: 'Corporate Events', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400', icon: '🏢' },
        { id: 4, name: 'Birthday', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', icon: '🎂' },
        { id: 5, name: 'Ceremony', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400', icon: '🎊' },
    ]);

    
   const axiosSecure = useAxiosSecure()
   useEffect(() => {
    axiosSecure.get('/decorator')
    .then(res => {
        setTopDecorators(res.data)
    })
   }, [axiosSecure])
   console.log(topDecorators);
   
   
    // TODO: Fetch testimonials from DB
    // API Endpoint: GET /api/testimonials
    // Expected fields: id, name, rating, text, avatar
    const [testimonials] = React.useState([
        { id: 1, name: 'Jessica Williams', rating: 5, text: 'Amazing service! They transformed our wedding venue into a fairy tale. Highly recommended!', avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: 2, name: 'Robert Brown', rating: 5, text: 'Professional team, great attention to detail. Our corporate event was a huge success!', avatar: 'https://i.pravatar.cc/150?img=6' },
        { id: 3, name: 'Amanda Lee', rating: 4, text: 'Beautiful home decor setup. The team was punctual and creative. Will book again!', avatar: 'https://i.pravatar.cc/150?img=7' },
    ]);

    // TODO: Fetch coverage zones from DB
    // API Endpoint: GET /api/coverage-zones
    // Expected fields: lat, lng, name, radius
    const [coverageZones] = React.useState([
        { lat: 23.8103, lng: 90.4125, name: 'Dhaka Central', radius: 5000 },
        { lat: 23.7805, lng: 90.4258, name: 'Gulshan', radius: 3000 },
        { lat: 23.7461, lng: 90.3742, name: 'Dhanmondi', radius: 3000 },
    ]);

    // Static data - can be moved to DB if needed
    const whyChooseUs = [
        { icon: <CheckCircle className="w-8 h-8" />, title: 'Verified Professionals', desc: 'All decorators are background verified' },
        { icon: <DollarSign className="w-8 h-8" />, title: 'Transparent Pricing', desc: 'No hidden charges, pay as per quote' },
        { icon: <Shield className="w-8 h-8" />, title: 'Service Guarantee', desc: '100% satisfaction or money back' },
        { icon: <Award className="w-8 h-8" />, title: 'Quality Assured', desc: 'Premium materials and execution' },
        { icon: <Clock className="w-8 h-8" />, title: 'On-Time Delivery', desc: 'Punctual setup and completion' },
        { icon: <Users className="w-8 h-8" />, title: 'Expert Team', desc: 'Experienced decoration specialists' },
    ];

    
       if(!topDecorators){
        return <Loder></Loder>
       }
   

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section - Elegant Modern Design */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-linear-to-br from-[#EBD5AB]/20 via-white to-[#628141]/10">
                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-80 h-80 bg-[#628141]/20 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
                <div className="absolute top-40 left-10 w-80 h-80 bg-[#EBD5AB]/30 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-[#628141]/15 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

                <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-7"
                        >
                            <div className="inline-block">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="px-5 py-2.5 bg-[#628141]/10 text-[#628141] rounded-full text-sm font-semibold inline-flex items-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Professional Decoration Services
                                </motion.span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B211A] leading-tight"
                            >
                                Transform Your
                                <span className="block text-[#628141]">
                                    Special Moments
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg text-gray-600 leading-relaxed"
                            >
                                Expert decoration services for weddings, events, and celebrations. 
                                Let us bring your vision to life with creativity and elegance.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 pt-2"
                            >
                                <Link to={'/services'} className="px-8 py-3.5 bg-[#628141] text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:bg-[#1B211A] transition-all duration-300 inline-flex items-center justify-center gap-2">
                                    Book Now
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                               
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="grid grid-cols-3 gap-8 pt-6"
                            >
                                <div>
                                    <h3 className="text-3xl font-bold text-[#628141]">500+</h3>
                                    <p className="text-gray-600 text-sm mt-1">Happy Clients</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#628141]">50+</h3>
                                    <p className="text-gray-600 text-sm mt-1">Expert Decorators</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#628141]">4.9★</h3>
                                    <p className="text-gray-600 text-sm mt-1">Average Rating</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800" 
                                    alt="Elegant Decoration" 
                                    className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl max-w-xs">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-[#628141] rounded-full flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1B211A] text-sm">Verified Professionals</p>
                                            <p className="text-xs text-gray-600">100% Satisfaction Guaranteed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-20 container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">Popular Categories</h2>
                    <p className="text-center text-gray-600 mb-14 text-base">Choose from our wide range of decoration services</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2, delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.03 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer group transition-all duration-300"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#1B211A]/70 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="text-white font-semibold text-base">{category.name}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Featured Services */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">Featured Services</h2>
                        <p className="text-center text-gray-600 mb-14 text-base">Handpicked decoration packages for you</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {featuredServices.map((service, index) => <ServiceCard key={index} service={service} index={index}></ServiceCard>)}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Top Decorators */}
            <section className="py-20 bg-[#EBD5AB]/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">Top Decorators</h2>
                        <p className="text-center text-gray-600 mb-14 text-base">Meet our verified decoration experts</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {topDecorators.slice(0, 4).map((decorator, index) => (
                                <motion.div
                                    key={decorator.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition-all duration-300"
                                >
                                    <div className="relative inline-block mb-4">                                        
                                        <div className="bg-white border-8 border-secondary w-10 h-10 rounded-4xl"></div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-[#1B211A]">{decorator.fullName}</h3>
                                    <p className="text-[#628141] font-semibold mb-3 text-sm">{decorator.specialty}</p>
                                    <div className="flex flex-col gap-2 items-center justify-center mb-2">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="ml-1 font-bold text-[#1B211A] text-sm">{decorator.currentStatus}</span>
                                        <span className="ml-1 text-gray-500 text-xs">({decorator.email})</span>
                                        <span className="ml-1 text-gray-500 text-xs">({decorator.phoneNumber})</span>
                                    </div>
                                    <div className="">
                                        {
                                            decorator.specialties.slice(0, 3).map(special => (
                                                <div className="badge badge-secondary m-1">{special}</div>
                                            ))
                                        }
                                    </div>
                                    <Link to={'/services'}><button className="w-full bg-[#628141] text-white py-2.5 rounded-full hover:bg-[#1B211A] transition-colors font-semibold mt-4 text-sm">
                                        Book Now
                                    </button></Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#EBD5AB]/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">Why Choose Us</h2>
                        <p className="text-center text-gray-600 mb-14 text-base">Your satisfaction is our priority</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyChooseUs.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-7 text-center transition-all duration-300"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#628141]/10 text-[#628141] rounded-full mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-[#1B211A]">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Service Coverage Map */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">Service Coverage</h2>
                        <p className="text-center text-gray-600 mb-14 text-base">We serve across major areas</p>
                        
                        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl relative z-0" style={{ height: '480px' }}>
                            <MapContainer center={[23.8103, 90.4125]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {coverageZones.map((zone, index) => (
                                    <Circle
                                        key={index}
                                        center={[zone.lat, zone.lng]}
                                        radius={zone.radius}
                                        pathOptions={{ color: '#628141', fillColor: '#628141', fillOpacity: 0.2 }}
                                    >
                                        <Popup>{zone.name}</Popup>
                                    </Circle>
                                ))}
                            </MapContainer>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-[#EBD5AB]/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-[#1B211A]">What Our Clients Say</h2>
                        <p className="text-center text-gray-600 mb-14 text-base">Real experiences from real customers</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300"
                                >
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic text-sm leading-relaxed">"{testimonial.text}"</p>
                                    <div className="flex items-center">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="w-11 h-11 rounded-full mr-3" />
                                        <div>
                                            <h4 className="font-bold text-[#1B211A] text-sm">{testimonial.name}</h4>
                                            <p className="text-xs text-gray-500">Verified Customer</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section - Elegant Design */}
            <section className="py-24 bg-[#1B211A] text-white relative overflow-hidden">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#EBD5AB] rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#628141] rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-8"
                        >
                            {/* Badge */}
                            <div className="inline-block">
                                <span className="px-5 py-2.5 bg-[#628141]/20 text-[#EBD5AB] rounded-full text-sm font-semibold inline-flex items-center gap-2 border border-[#628141]/30">
                                    <Sparkles className="w-4 h-4" />
                                    Limited Time Offer
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Ready to Transform
                                <span className="block text-[#EBD5AB]">Your Special Event?</span>
                            </h2>

                            {/* Description */}
                            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Book your decoration service today and let our expert team create an unforgettable atmosphere for your celebration. Get 20% off on your first booking!
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link to={'/services'}><motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-[#628141] text-white rounded-xl text-base font-semibold shadow-lg hover:bg-[#EBD5AB] hover:text-[#1B211A] transition-all duration-300 inline-flex items-center justify-center gap-2"
                                >
                                    Get Started Now
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button></Link>
                               
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto border-t border-gray-700">
                                <div>
                                    <p className="text-2xl font-bold text-[#EBD5AB]">500+</p>
                                    <p className="text-sm text-gray-400 mt-1">Projects Completed</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#EBD5AB]">98%</p>
                                    <p className="text-sm text-gray-400 mt-1">Client Satisfaction</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#EBD5AB]">24/7</p>
                                    <p className="text-sm text-gray-400 mt-1">Customer Support</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
