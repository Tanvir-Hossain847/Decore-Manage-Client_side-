import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Decorator = () => {
  const { user } = use(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);

    try {
      const decoratorData = {
        userId: user?.uid,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        businessName: data.businessName,
        yearsOfExperience: data.yearsOfExperience,
        specialties: data.specialties,
        serviceArea: data.serviceArea,
        availableDays: data.availableDays,
        applicationDate: new Date(),
        assignedTask: [],
        status: "pending",
      };

      const response = await axiosSecure.post("/decorator", decoratorData);

      if (response.data.insertedId) {
        Swal.fire({
          title: "Registration Complete",
          text: "Thank You For Showing Inerest We Wil Contact You Soon",
          icon: "success",
        });
        setError("");
        reset();

        navigate("/dashboard/myprofile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#EBD5AB]/20 py-12 px-4">
      <div>
        <title>Become a Decorator</title>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#1B211A] mb-4">Become a Decorator!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our platform and showcase your decoration skills to help create memorable moments for our clients
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#628141] to-[#1B211A] p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Decorator Application</h2>
            <p className="text-[#EBD5AB]">Tell us about yourself and your decoration expertise</p>
          </div>

          {/* Form Body */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                {/* Basic Identity Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#628141] rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="text-2xl font-bold text-[#1B211A]">Basic Identity</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        {...register("fullName", {
                          required: "Full name is required",
                        })}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.fullName ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300 ${
                          user?.displayName ? "bg-gray-50" : ""
                        }`}
                        placeholder="Enter your full name"
                        readOnly={!!user?.displayName}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300 ${
                          user?.email ? "bg-gray-50" : ""
                        }`}
                        placeholder="your.email@example.com"
                        readOnly={!!user?.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^(\+88)?01[3-9]\d{8}$/,
                            message:
                              "Please enter a valid Bangladeshi phone number",
                          },
                        })}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.phoneNumber ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300`}
                        placeholder="+8801XXXXXXXXX"
                      />
                      {errors.phoneNumber && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Business Information Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#628141] rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="text-2xl font-bold text-[#1B211A]">Business Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business / Decorator Name</label>
                      <input
                        {...register("businessName", {
                          required: "Business name is required",
                        })}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.businessName ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300`}
                        placeholder="Your Business or Decorator Name"
                      />
                      {errors.businessName && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                      <select
                        {...register("yearsOfExperience", {
                          required: "Please select your experience level",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.yearsOfExperience ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300 bg-white`}
                      >
                        <option value="">Select Experience Level</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                      {errors.yearsOfExperience && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.yearsOfExperience.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Service Area / City</label>
                      <input
                        {...register("serviceArea", {
                          required: "Service area is required",
                        })}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.serviceArea ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300`}
                        placeholder="e.g., Dhaka, Chittagong, Sylhet"
                      />
                      {errors.serviceArea && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.serviceArea.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Available Days</label>
                      <select
                        {...register("availableDays", {
                          required: "Please select your availability",
                        })}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.availableDays ? "border-red-500" : "border-gray-200"
                        } focus:border-[#628141] focus:outline-none transition-all duration-300 bg-white`}
                      >
                        <option value="">Select Availability</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="weekends">Weekends only</option>
                        <option value="both">Both weekdays and weekends</option>
                      </select>
                      {errors.availableDays && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.availableDays.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialties Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#628141] rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="text-2xl font-bold text-[#1B211A]">Specialties</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Select all decoration types you specialize in</label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { value: "wedding", label: "Wedding Decoration", icon: "💒" },
                        { value: "birthday", label: "Birthday Decoration", icon: "🎂" },
                        { value: "corporate", label: "Corporate Events", icon: "🏢" },
                        { value: "home", label: "Home Decoration", icon: "🏠" },
                        { value: "stage", label: "Stage / Lighting", icon: "🎭" }
                      ].map((specialty) => (
                        <label key={specialty.value} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#628141] hover:bg-[#628141]/5 transition-all duration-300 cursor-pointer">
                          <input
                            {...register("specialties")}
                            type="checkbox"
                            value={specialty.value}
                            className="w-5 h-5 text-[#628141] border-2 border-gray-300 rounded focus:ring-[#628141]"
                          />
                          <span className="text-2xl">{specialty.icon}</span>
                          <span className="font-medium text-gray-700">{specialty.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    {error}
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
                        Submitting Application...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>

                {/* Footer Note */}
                <div className="mt-8 p-6 bg-gradient-to-r from-[#628141]/10 to-[#EBD5AB]/20 rounded-xl border border-[#628141]/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#628141] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B211A] mb-1">Application Review Process</h4>
                      <p className="text-gray-600">
                        Your application will be reviewed within 2-3 business days. We'll contact you via email with our decision and next steps.
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

export default Decorator;
