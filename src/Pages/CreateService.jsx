import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateService = () => {
    const { user } = use(AuthContext);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            createdByEmail: user?.email || '',
            unit: 'per event',
            isActive: 'Pending',
            rating: 0,
            reviewsCount: 0
        }
    });

    const onSubmit = async (data) => {
        setError('');
        setSuccess(false);
        setIsSubmitting(true);

        try {
            let imageUrl = '';
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append("image", data.image[0]);
                const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
                
                const imageResponse = await axios.post(imageAPI, formData);
                if (imageResponse.data.success) {
                    imageUrl = imageResponse.data.data.url;
                }
            }

            const serviceData = {
                service_name: data.service_name,
                short_description: data.short_description,
                description: data.description,
                image: imageUrl,
                cost: parseFloat(data.cost),
                unit: data.unit,
                category: data.category,
                rating: 0, 
                reviewsCount: 0,
                createdByEmail: user?.email,
                isActive: 'Pending', 
                createdAt: new Date()
            };

            const response = await axiosSecure.post('/services', serviceData);
            
            if (response.data.insertedId) {
                Swal.fire({
                          title: "Package Added",
                          icon: "success",
                        });
                reset();
                    // navigate('/dashboard/my-services');
                    setIsSubmitting(false)
            }
        } catch (error) {
            console.log(error);
            setError('Failed to create service. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#EBD5AB]/20 py-12 px-4">
            <div><title>Create Service</title></div>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-[#1B211A] mb-4">Create New Service</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Add a new decoration service to your portfolio and showcase your expertise to potential clients
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-[#628141] to-[#1B211A] p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Service Creation Form</h2>
                        <p className="text-[#EBD5AB]">Fill in the details to create your new decoration service</p>
                    </div>

                    <div className="p-8 lg:p-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset w-full">
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-[#628141] rounded-full flex items-center justify-center text-white font-bold">1</div>
                                        <h3 className="text-2xl font-bold text-[#1B211A]">Service Information</h3>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                                            <input
                                                {...register("service_name", {
                                                    required: "Service name is required",
                                                    minLength: {
                                                        value: 3,
                                                        message: "Service name should be at least 3 characters"
                                                    }
                                                })}
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.service_name ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                                                placeholder="e.g., Premium Wedding Decoration"
                                            />
                                            {errors.service_name && <p className="text-xs text-red-500 mt-1">{errors.service_name.message}</p>}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                                <select
                                                    {...register("category", {
                                                        required: "Please select a category"
                                                    })}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300 bg-white`}
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="home">🏠 Home</option>
                                                    <option value="wedding">💒 Wedding</option>
                                                    <option value="office">🏢 Office</option>
                                                    <option value="seminar">📊 Seminar</option>
                                                    <option value="meeting">🤝 Meeting</option>
                                                </select>
                                                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cost (৳)</label>
                                                <input
                                                    {...register("cost", {
                                                        required: "Cost is required",
                                                        min: {
                                                            value: 100,
                                                            message: "Cost should be at least ৳100"
                                                        }
                                                    })}
                                                    type="number"
                                                    step="0.01"
                                                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.cost ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                                                    placeholder="e.g., 15000"
                                                />
                                                {errors.cost && <p className="text-xs text-red-500 mt-1">{errors.cost.message}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                                            <input
                                                {...register("unit")}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none"
                                                value="per event"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Pricing unit is fixed as "per event"</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                                            <input
                                                {...register("short_description", {
                                                    required: "Short description is required",
                                                    maxLength: {
                                                        value: 100,
                                                        message: "Short description should be maximum 100 characters"
                                                    }
                                                })}
                                                type="text"
                                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.short_description ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                                                placeholder="Brief summary of your service (max 100 characters)"
                                            />
                                            {errors.short_description && <p className="text-xs text-red-500 mt-1">{errors.short_description.message}</p>}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {watch("short_description")?.length || 0}/100 characters
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                                            <textarea
                                                {...register("description", {
                                                    required: "Description is required",
                                                    minLength: {
                                                        value: 50,
                                                        message: "Description should be at least 50 characters"
                                                    }
                                                })}
                                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300 resize-none`}
                                                placeholder="Detailed description of your service, what's included, special features, etc..."
                                                rows="5"
                                            />
                                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image</label>
                                            <input
                                                {...register("image", {
                                                    required: "Please upload a service image"
                                                })}
                                                type="file"
                                                accept="image/*"
                                                className={`w-full px-4 py-3 rounded-xl border-2 ${errors.image ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#628141]/10 file:text-[#628141] file:font-semibold hover:file:bg-[#628141]/20 file:transition-all file:duration-300`}
                                            />
                                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
                                            <p className="text-xs text-gray-500 mt-1">Upload a high-quality image showcasing your service (JPG, PNG)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* System Information Section */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-[#628141] rounded-full flex items-center justify-center text-white font-bold">2</div>
                                        <h3 className="text-2xl font-bold text-[#1B211A]">System Information</h3>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Created By Email (Read-only) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Created By</label>
                                            <input
                                                {...register("createdByEmail")}
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none"
                                                value={user?.email || ''}
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Auto-filled from your account</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                            <input
                                                {...register("isActive")}
                                                type="text"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none"
                                                value="Pending"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Will be reviewed by admin</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Initial Rating</label>
                                            <input
                                                {...register("rating")}
                                                type="number"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none"
                                                value="0"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Will be updated based on customer reviews</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews Count</label>
                                            <input
                                                {...register("reviewsCount")}
                                                type="number"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none"
                                                value="0"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Will be updated as customers leave reviews</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Success/Error Messages */}
                                {success && (
                                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                                        <span>Service created successfully! Redirecting to your services...</span>
                                    </div>
                                )}
                                {error && (
                                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                        <span>{error}</span>
                                    </div>
                                )}
                                
                                {/* Submit Button */}
                                <div className="text-center">
                                    <button 
                                        type="submit" 
                                        className="bg-[#628141] hover:bg-[#1B211A] text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-3">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Service...
                                            </span>
                                        ) : (
                                            'Create Service'
                                        )}
                                    </button>
                                </div>

                                {/* Footer Note */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-[#628141]/10 to-[#EBD5AB]/20 rounded-xl border border-[#628141]/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#628141] rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1B211A] mb-1">Service Review Process</h4>
                                            <p className="text-gray-600">
                                                Your service will be reviewed by our team before being published. You'll be notified via email once it's approved.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateService;