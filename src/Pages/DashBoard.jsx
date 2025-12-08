import React from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Package, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = React.useContext(AuthContext);
    const [activeTab, setActiveTab] = React.useState('profile');

    // TODO: FETCH USER BOOKINGS FROM DATABASE
    // API Endpoint: GET /api/bookings/user/:userId
    // Expected fields: id, packageTitle, packageImage, bookingDate, location, status, createdAt, price
    const [bookings] = React.useState([
        {
            id: 1,
            packageTitle: 'Luxury Wedding Decoration',
            packageImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
            bookingDate: '2024-12-25',
            location: 'Radisson Blu, Dhaka',
            status: 'confirmed',
            createdAt: '2024-12-01',
            price: 15999
        },
        {
            id: 2,
            packageTitle: 'Birthday Bash Package',
            packageImage: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
            bookingDate: '2024-12-20',
            location: 'Home - Gulshan 2',
            status: 'pending',
            createdAt: '2024-12-05',
            price: 2999
        },
    ]);

    // TODO: FETCH USER PROFILE DATA FROM DATABASE
    // API Endpoint: GET /api/users/:userId
    // Expected fields: phone, address, dateOfBirth, preferences
    const [profileData, setProfileData] = React.useState({
        phone: '+880 1234-567890',
        address: '123 Main Street, Dhaka 1000',
        dateOfBirth: '1990-01-01',
    });

    const [isEditing, setIsEditing] = React.useState(false);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // TODO: UPDATE USER PROFILE IN DATABASE
        // API Endpoint: PUT /api/users/:userId
        // Payload: profileData
        console.log('Profile updated:', profileData);
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">My Dashboard</h1>
                    <p className="text-gray-600">Manage your profile and bookings</p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                            {/* User Info */}
                            <div className="text-center mb-6 pb-6 border-b border-gray-200">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.displayName}
                                        alt={user?.displayName}
                                        className="w-24 h-24 rounded-full border-4 border-accent object-cover mx-auto"
                                    />
                                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-primary mb-1">{user?.displayName}</h2>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                        activeTab === 'profile'
                                            ? 'bg-secondary text-white'
                                            : 'text-gray-700 hover:bg-accent/20'
                                    }`}
                                >
                                    <User className="w-5 h-5" />
                                    <span>My Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('bookings')}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                        activeTab === 'bookings'
                                            ? 'bg-secondary text-white'
                                            : 'text-gray-700 hover:bg-accent/20'
                                    }`}
                                >
                                    <Package className="w-5 h-5" />
                                    <span>My Bookings</span>
                                </button>
                            </nav>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-2xl shadow-md p-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        {isEditing ? 'Cancel' : 'Edit Profile'}
                                    </button>
                                </div>

                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    {/* Basic Info (Read-only from Auth) */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Full Name
                                            </label>
                                            <div className="flex items-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                                <User className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-700">{user?.displayName}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Email Address
                                            </label>
                                            <div className="flex items-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-700">{user?.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Editable Fields */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors ${
                                                        isEditing
                                                            ? 'border-gray-200 focus:border-secondary focus:outline-none'
                                                            : 'bg-gray-50 border-gray-200 text-gray-700'
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={profileData.dateOfBirth}
                                                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                                                    disabled={!isEditing}
                                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors ${
                                                        isEditing
                                                            ? 'border-gray-200 focus:border-secondary focus:outline-none'
                                                            : 'bg-gray-50 border-gray-200 text-gray-700'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <textarea
                                                value={profileData.address}
                                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                disabled={!isEditing}
                                                rows="3"
                                                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors resize-none ${
                                                    isEditing
                                                        ? 'border-gray-200 focus:border-secondary focus:outline-none'
                                                        : 'bg-gray-50 border-gray-200 text-gray-700'
                                                }`}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'bookings' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-primary mb-2">My Bookings</h2>
                                    <p className="text-gray-600">View and manage your decoration service bookings</p>
                                </div>

                                {bookings.length === 0 ? (
                                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
                                        <p className="text-gray-600 mb-6">Start exploring our services and make your first booking!</p>
                                        <a
                                            href="/services"
                                            className="inline-block px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-colors"
                                        >
                                            Browse Services
                                        </a>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map((booking, index) => (
                                            <motion.div
                                                key={booking.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                            >
                                                <div className="grid md:grid-cols-4 gap-6 p-6">
                                                    {/* Image */}
                                                    <div className="md:col-span-1">
                                                        <img
                                                            src={booking.packageImage}
                                                            alt={booking.packageTitle}
                                                            className="w-full h-32 object-cover rounded-xl"
                                                        />
                                                    </div>

                                                    {/* Details */}
                                                    <div className="md:col-span-2 space-y-3">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-primary mb-1">
                                                                {booking.packageTitle}
                                                            </h3>
                                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                            </span>
                                                        </div>

                                                        <div className="space-y-2 text-sm text-gray-600">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4 text-secondary" />
                                                                <span>Event Date: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-secondary" />
                                                                <span>{booking.location}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-secondary" />
                                                                <span>Booked on: {new Date(booking.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price & Actions */}
                                                    <div className="md:col-span-1 flex flex-col justify-between items-end">
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-secondary">৳{booking.price}</p>
                                                        </div>
                                                        <button className="px-4 py-2 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-semibold text-sm">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
