import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router';

const Coverage = () => {
    // TODO: Fetch coverage zones from DB
    // API Endpoint: GET /api/coverage-zones
    // Expected fields: lat, lng, name, radius, address, phone, hours
    const [coverageZones] = React.useState([
        { 
            lat: 23.8103, 
            lng: 90.4125, 
            name: 'Dhaka Central', 
            radius: 5000,
            address: '123 Main Street, Dhaka 1000',
            phone: '+880 1234-567890',
            hours: '9:00 AM - 8:00 PM'
        },
        { 
            lat: 23.7805, 
            lng: 90.4258, 
            name: 'Gulshan', 
            radius: 3000,
            address: '456 Gulshan Avenue, Dhaka 1212',
            phone: '+880 1234-567891',
            hours: '9:00 AM - 8:00 PM'
        },
        { 
            lat: 23.7461, 
            lng: 90.3742, 
            name: 'Dhanmondi', 
            radius: 3000,
            address: '789 Dhanmondi Road, Dhaka 1205',
            phone: '+880 1234-567892',
            hours: '9:00 AM - 8:00 PM'
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-linear-to-br from-[#EBD5AB]/20 via-white to-[#628141]/10 py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1B211A] mb-4">
                            Service Coverage Areas
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We proudly serve multiple locations across the city. Find your nearest service area and get in touch with us today.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1B211A] mb-3">
                                Interactive Coverage Map
                            </h2>
                            <p className="text-gray-600 text-base">
                                Click on the highlighted areas to see more details
                            </p>
                        </div>
                        
                        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl relative z-0" style={{ height: '600px' }}>
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
                                        <Popup>
                                            <div className="p-2">
                                                <h3 className="font-bold text-[#1B211A] mb-2">{zone.name}</h3>
                                                <p className="text-sm text-gray-600">{zone.address}</p>
                                            </div>
                                        </Popup>
                                    </Circle>
                                ))}
                            </MapContainer>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Coverage Areas List */}
            <section className="py-16 bg-[#EBD5AB]/10">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1B211A] mb-3">
                                Our Service Locations
                            </h2>
                            <p className="text-gray-600 text-base">
                                Find detailed information about each service area
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {coverageZones.map((zone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-[#628141] rounded-full flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1B211A] mb-1">{zone.name}</h3>
                                            <p className="text-sm text-gray-600">{zone.address}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-[#628141] shrink-0" />
                                            <span className="text-sm text-gray-700">{zone.phone}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Clock className="w-5 h-5 text-[#628141] shrink-0" />
                                            <span className="text-sm text-gray-700">{zone.hours}</span>
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 px-6 py-3 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#1B211A] transition-colors duration-300">
                                        Contact This Location
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#1B211A] rounded-3xl p-12 text-center text-white"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Don't See Your Area?
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            We're constantly expanding our service areas. Contact us to check if we can serve your location.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={'/contact'}><button className="px-8 py-3.5 bg-[#628141] text-white rounded-xl font-semibold hover:bg-[#EBD5AB] hover:text-[#1B211A] transition-all duration-300">
                                Contact Us
                            </button></Link>
                            <a 
                                href="mailto:info@decorhub.com"
                                className="px-8 py-3.5 bg-transparent text-white rounded-xl font-semibold border-2 border-[#628141] hover:bg-[#628141]/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <Mail className="w-5 h-5" />
                                Email Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Coverage;
