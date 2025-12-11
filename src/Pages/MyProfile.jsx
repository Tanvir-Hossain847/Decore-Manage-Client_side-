import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        phone: '+880 1234-567890',
        address: '123 Main Street, Dhaka 1000',
        dateOfBirth: '1990-01-01',
        bio: 'Love celebrating special moments with beautiful decorations!'
    });
    

     const axiosSecure = useAxiosSecure()
        const { data: booking = [] } = useQuery({
            queryKey: ['myBooking'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/booking?email=${user.email}`);
                return res.data
            }
        })

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // TODO: UPDATE USER PROFILE IN DATABASE
        // API Endpoint: PUT /api/users/:userId
        // Payload: profileData
        console.log('Profile updated:', profileData);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
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
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your personal information</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-md p-8 text-center sticky top-24">
                            {/* Profile Picture */}
                            <div className="relative inline-block mb-6">
                                <img
                                    src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.displayName + '&size=200'}
                                    alt={user?.displayName}
                                    className="w-32 h-32 rounded-full border-4 border-accent object-cover mx-auto"
                                />
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            {/* User Info */}
                            <h2 className="text-2xl font-bold text-primary mb-2">{user?.displayName}</h2>
                            <p className="text-gray-600 mb-6">{user?.email}</p>

                            {/* Bio */}
                            <div className="bg-accent/10 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-700 italic">"{profileData.bio}"</p>
                            </div>

                            {/* Stats */}
                            <div className="gap-4 pt-6 border-t border-gray-200">
                                <div>
                                    <p className="text-2xl font-bold text-secondary">{booking.length}</p>
                                    <p className="text-xs text-gray-600">Bookings</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-md p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-lg hover:bg-primary transition-colors font-semibold"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                {/* Read-only Fields from Auth */}
                                <div className="space-y-6 pb-6 border-b border-gray-200">
                                    <h3 className="text-lg font-bold text-primary">Account Information</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Full Name
                                            </label>
                                            <div className="flex items-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                                <User className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-700">{user?.displayName}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">From your account</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Email Address
                                            </label>
                                            <div className="flex items-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-700 truncate">{user?.email}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Verified email</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Editable Fields */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-primary">Personal Details</h3>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-primary mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={profileData.phone}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    required
                                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors ${
                                                        isEditing
                                                            ? 'border-gray-200 focus:border-secondary focus:outline-none bg-white'
                                                            : 'bg-gray-50 border-gray-200 text-gray-700'
                                                    }`}
                                                    placeholder="+880 1234-567890"
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
                                                    name="dateOfBirth"
                                                    value={profileData.dateOfBirth}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors ${
                                                        isEditing
                                                            ? 'border-gray-200 focus:border-secondary focus:outline-none bg-white'
                                                            : 'bg-gray-50 border-gray-200 text-gray-700'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Address *
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <textarea
                                                name="address"
                                                value={profileData.address}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                required
                                                rows="3"
                                                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-colors resize-none ${
                                                    isEditing
                                                        ? 'border-gray-200 focus:border-secondary focus:outline-none bg-white'
                                                        : 'bg-gray-50 border-gray-200 text-gray-700'
                                                }`}
                                                placeholder="Enter your complete address..."
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-primary mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            rows="4"
                                            className={`w-full px-4 py-3 border-2 rounded-xl transition-colors resize-none ${
                                                isEditing
                                                    ? 'border-gray-200 focus:border-secondary focus:outline-none bg-white'
                                                    : 'bg-gray-50 border-gray-200 text-gray-700'
                                            }`}
                                            placeholder="Tell us about yourself..."
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-colors shadow-lg"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;