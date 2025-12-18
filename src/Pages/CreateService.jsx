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
            // Handle image upload
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
            }
        } catch (error) {
            console.log(error);
            setError('Failed to create service. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div>
            <div><title>Create Service</title></div>
            <div className="my-10 min-h-screen">
                <div className="flex-col flex justify-center items-center gap-5">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Create New Service</h1>
                        <p className="text-lg mt-2">Add a new decoration service to your portfolio</p>
                    </div>
                    <div className="card bg-secondary/25 w-full max-w-4xl shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="fieldset">
                                    {/* Service Basic Info Section */}
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold mb-4 text-secondary">Service Information</h2>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Service Name */}
                                            <div className="md:col-span-2">
                                                <label className="label">Service Name</label>
                                                <input
                                                    {...register("service_name", {
                                                        required: "Service name is required",
                                                        minLength: {
                                                            value: 3,
                                                            message: "Service name should be at least 3 characters"
                                                        }
                                                    })}
                                                    type="text"
                                                    className={`input w-full ${errors.service_name ? 'input-error' : ''}`}
                                                    placeholder="e.g., Premium Wedding Decoration"
                                                />
                                                {errors.service_name && <p className="text-xs text-error">{errors.service_name.message}</p>}
                                            </div>

                                            <div>
                                                <label className="label">Category</label>
                                                <select
                                                    {...register("category", {
                                                        required: "Please select a category"
                                                    })}
                                                    className={`select w-full ${errors.category ? 'select-error' : ''}`}
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="home">Home</option>
                                                    <option value="wedding">Wedding</option>
                                                    <option value="office">Office</option>
                                                    <option value="seminar">Seminar</option>
                                                    <option value="meeting">Meeting</option>
                                                </select>
                                                {errors.category && <p className="text-xs text-error">{errors.category.message}</p>}
                                            </div>

                                            <div>
                                                <label className="label">Cost (৳)</label>
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
                                                    className={`input w-full ${errors.cost ? 'input-error' : ''}`}
                                                    placeholder="e.g., 15000"
                                                />
                                                {errors.cost && <p className="text-xs text-error">{errors.cost.message}</p>}
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="label">Unit</label>
                                            <input
                                                {...register("unit")}
                                                type="text"
                                                className="input w-full"
                                                value="per event"
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Pricing unit is fixed as "per event"</p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="label">Short Description</label>
                                            <input
                                                {...register("short_description", {
                                                    required: "Short description is required",
                                                    maxLength: {
                                                        value: 100,
                                                        message: "Short description should be maximum 100 characters"
                                                    }
                                                })}
                                                type="text"
                                                className={`input w-full ${errors.short_description ? 'input-error' : ''}`}
                                                placeholder="Brief summary of your service (max 100 characters)"
                                            />
                                            {errors.short_description && <p className="text-xs text-error">{errors.short_description.message}</p>}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {watch("short_description")?.length || 0}/100 characters
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="label">Full Description</label>
                                            <textarea
                                                {...register("description", {
                                                    required: "Description is required",
                                                    minLength: {
                                                        value: 50,
                                                        message: "Description should be at least 50 characters"
                                                    }
                                                })}
                                                className={`textarea w-full ${errors.description ? 'textarea-error' : ''}`}
                                                placeholder="Detailed description of your service, what's included, special features, etc..."
                                                rows="5"
                                            />
                                            {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
                                        </div>

                                        <div className="mt-4">
                                            <label className="label">Service Image</label>
                                            <input
                                                {...register("image", {
                                                    required: "Please upload a service image"
                                                })}
                                                type="file"
                                                accept="image/*"
                                                className={`file-input w-full ${errors.image ? 'file-input-error' : ''}`}
                                            />
                                            {errors.image && <p className="text-xs text-error">{errors.image.message}</p>}
                                            <p className="text-xs text-gray-500 mt-1">Upload a high-quality image showcasing your service (JPG, PNG)</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold mb-4 text-secondary">System Information</h2>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Created By Email (Read-only) */}
                                            <div>
                                                <label className="label">Created By</label>
                                                <input
                                                    {...register("createdByEmail")}
                                                    type="email"
                                                    className="input w-full"
                                                    value={user?.email || ''}
                                                    readOnly
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Auto-filled from your account</p>
                                            </div>

                                            <div>
                                                <label className="label">Status</label>
                                                <input
                                                    {...register("isActive")}
                                                    type="text"
                                                    className="input w-full"
                                                    value="Pending"
                                                    readOnly
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Will be reviewed by admin</p>
                                            </div>

                                            <div>
                                                <label className="label">Initial Rating</label>
                                                <input
                                                    {...register("rating")}
                                                    type="number"
                                                    className="input w-full"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Will be updated based on customer reviews</p>
                                            </div>

                                            <div>
                                                <label className="label">Reviews Count</label>
                                                <input
                                                    {...register("reviewsCount")}
                                                    type="number"
                                                    className="input w-full"
                                                    maxLength={5}
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Will be updated as customers leave reviews</p>
                                            </div>
                                        </div>
                                    </div>

                                    {success && (
                                        <div className="alert alert-success mb-4">
                                            <span>Service created successfully! Redirecting to your services...</span>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="alert alert-error mb-4">
                                            <span>{error}</span>
                                        </div>
                                    )}
                                    
                                    <button 
                                        type="submit" 
                                        className="btn btn-secondary text-white w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Creating Service...' : 'Create Service'}
                                    </button>

                                    <p className="text-center mt-4 text-sm text-gray-600">
                                        Your service will be reviewed by our team before being published. You'll be notified via email once it's approved.
                                    </p>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateService;