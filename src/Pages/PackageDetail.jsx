import React, { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Star, MapPin, Clock, Users, CheckCircle, X, Calendar, AlertCircle } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import Loder from '../Components/Loder';
import { useForm } from 'react-hook-form';
import PackegeBanner from '../Components/PackegeBanner';
import PackageDescription from '../Components/PackageDescription';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = use(AuthContext);
    const [service, setService] = useState()
    const [showBookingModal, setShowBookingModal] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    const axiosInstance = useAxiosSecure()

    const [bookingData, setBookingData] = useState({
        date: '',
        location: '',
        additionalNotes: ''
    });
    const [packageData] = useState({
        duration: '8-10 hours',
        capacity: '200-300 guests',
        features: [
            'Premium floral arrangements',
            'Custom stage decoration',
            'Table centerpieces',
            'Entrance arch decoration',
            'Lighting setup',
            'Backdrop design',
            'Aisle decoration',
            'Photo booth area'
        ],
        included: [
            'Professional decoration team',
            'All decoration materials',
            'Setup and teardown',
            'On-site coordinator',
            'Emergency backup supplies',
            'Photography-friendly setup'
        ],
        notIncluded: [
            'Venue rental',
            'Catering services',
            'Photography/Videography',
            'Entertainment/DJ',
            'Transportation'
        ]
    });


    useEffect(() => {
        fetch(`http://localhost:3000/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [id])

    if (!service) {
        return <Loder></Loder>
    }

    // console.log(service);
    // console.log(location);


    const { category, cost, description, image, rating, reviewCount, service_name, short_description } = service;



    const handleBookingChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleBookingSubmit = (data) => {
        console.log(data);

        if (!user) {
            // Redirect to login if not authenticated
            navigate('/auth/login', { state: `/services/${id}` });
            return;
        }



        const booking = {
            userEmail: user.email,
            userName: user.displayName,
            packageId: service._id,
            packageTitle: service.service_name,
            packagePrice: service.cost,
            bookingDate: bookingData.date,
            location: bookingData.location,
            additionalNotes: bookingData.additionalNotes,
            status: 'pending',
            createdAt: new Date()
        }

        axiosInstance.post("/booking", booking)
            .then(res => {
                console.log(res.data);
            })

        Swal.fire({
            title: "Booking Succesful",
            text: "Booking request submitted successfully! We will contact you soon.",
            icon: "success"
        });

        console.log('Booking submitted:', {
            user: {
                email: user.email,
                name: user.displayName
            },
            package: {
                id: packageData.id,
                title: packageData.title,
                price: packageData.price
            },
            booking: bookingData
        });

        setShowBookingModal(false);
        setBookingData({
            date: '',
            location: '',
            additionalNotes: ''
        });
    };

    const openBookingModal = () => {
        if (!user) {
            navigate('/auth/login', { state: `/services/${id}` });
            return;
        }
        setShowBookingModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <PackegeBanner service={service} packageData={packageData}></PackegeBanner>

            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className='flex lg:flex-row flex-col gap-12'>
                        <div className="">
                            <PackageDescription service={service} packageData={packageData}></PackageDescription>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl shadow-xl p-8 sticky top-24"
                            >
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-bold text-secondary">৳{cost}</span>
                                        <span className="text-gray-500">/ event</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Starting price - customizable based on requirements</p>
                                </div>

                                <button
                                    onClick={openBookingModal}
                                    className="w-full px-8 py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
                                >
                                    Book Now
                                </button>



                                {!user && (
                                    <div className="flex items-start gap-2 p-4 bg-accent/20 rounded-xl mb-6">
                                        <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-700">
                                            Please <span className="font-semibold text-secondary">login</span> to book this service
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-4 pt-6 border-t border-gray-200">
                                    <h3 className="font-bold text-primary mb-4">Quick Info</h3>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-secondary shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-primary">Duration</p>
                                            <p className="text-sm text-gray-600">{packageData.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-secondary shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-primary">Capacity</p>
                                            <p className="text-sm text-gray-600">{packageData.capacity}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 text-center">
                                        Have questions? <a href="/contact" className="text-secondary font-semibold hover:underline">Contact us</a>
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                            <h2 className="text-2xl font-bold text-primary">Book This Service</h2>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit(handleBookingSubmit)} className="p-6 space-y-6">
                            {/* Package Info */}
                            <div className="bg-accent/10 rounded-xl p-4">
                                <h3 className="font-bold text-primary mb-2">{service_name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{category}</p>
                                <p className="text-2xl font-bold text-secondary">৳{cost}</p>
                            </div>

                            {/* User Info (Pre-filled) */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        value={user?.displayName || ''}
                                        disabled
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-primary mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Event Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        {...register('date')}
                                        name="date"
                                        value={bookingData.date}
                                        onChange={handleBookingChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Event Location *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                    <textarea
                                        name="location"
                                        {...register('location')}
                                        value={bookingData.location}
                                        onChange={handleBookingChange}
                                        required
                                        rows="3"
                                        placeholder="Enter complete venue address..."
                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-primary mb-2">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    name="additionalNotes"
                                    {...register('additionalNotes')}
                                    value={bookingData.additionalNotes}
                                    onChange={handleBookingChange}
                                    rows="4"
                                    placeholder="Any special requirements or preferences..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Info Box */}
                            <div className="bg-secondary/10 rounded-xl p-4">
                                <p className="text-sm text-gray-700">
                                    <strong>Note:</strong> This is a booking request. Our team will contact you within 24 hours to confirm availability and discuss final details.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowBookingModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-colors shadow-lg"
                                >
                                    Submit Booking Request
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PackageDetail;
