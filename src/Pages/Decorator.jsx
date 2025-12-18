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
    <div>
      <div>
        <title>Become a Decorator</title>
      </div>
      <div className="my-10 min-h-screen">
        <div className="flex-col flex justify-center items-center gap-5">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Become a Decorator!</h1>
            <p className="text-lg mt-2">
              Join our platform and showcase your decoration skills
            </p>
          </div>
          <div className="card bg-secondary/25 w-full max-w-2xl shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-secondary">
                      Decorator Form
                    </h2>
                    <div className="space-y-5">
                      <div className="">
                        <label className="label">Full Name</label>
                        <input
                          {...register("fullName", {
                            required: "Full name is required",
                          })}
                          type="text"
                          className={`input w-full ${
                            errors.fullName ? "input-error" : ""
                          }`}
                          placeholder="Full Name"
                          readOnly={!!user?.displayName}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-error">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">Email</label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          className={`input w-full ${
                            errors.email ? "input-error" : ""
                          }`}
                          placeholder="Email"
                          readOnly={!!user?.email}
                        />
                        {errors.email && (
                          <p className="text-xs text-error">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">Phone Number</label>
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
                          className={`input w-full ${
                            errors.phoneNumber ? "input-error" : ""
                          }`}
                          placeholder="+8801XXXXXXXXX"
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-error">
                            {errors.phoneNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">
                          Business / Decorator Name
                        </label>
                        <input
                          {...register("businessName", {
                            required: "Business name is required",
                          })}
                          type="text"
                          className={`input w-full ${
                            errors.businessName ? "input-error" : ""
                          }`}
                          placeholder="Your Business or Decorator Name"
                        />
                        {errors.businessName && (
                          <p className="text-xs text-error">
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">Years of Experience</label>
                        <select
                          {...register("yearsOfExperience", {
                            required: "Please select your experience level",
                          })}
                          className={`select w-full ${
                            errors.yearsOfExperience ? "select-error" : ""
                          }`}
                        >
                          <option value="">Select Experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                        {errors.yearsOfExperience && (
                          <p className="text-xs text-error">
                            {errors.yearsOfExperience.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">
                          Specialties (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <label className="label cursor-pointer">
                            <input
                              {...register("specialties")}
                              type="checkbox"
                              value="wedding"
                              className="checkbox"
                            />
                            <span className="label-text">
                              Wedding decoration
                            </span>
                          </label>
                          <label className="label cursor-pointer">
                            <input
                              {...register("specialties")}
                              type="checkbox"
                              value="birthday"
                              className="checkbox"
                            />
                            <span className="label-text">
                              Birthday decoration
                            </span>
                          </label>
                          <label className="label cursor-pointer">
                            <input
                              {...register("specialties")}
                              type="checkbox"
                              value="corporate"
                              className="checkbox"
                            />
                            <span className="label-text">Corporate events</span>
                          </label>
                          <label className="label cursor-pointer">
                            <input
                              {...register("specialties")}
                              type="checkbox"
                              value="home"
                              className="checkbox"
                            />
                            <span className="label-text">Home decoration</span>
                          </label>
                          <label className="label cursor-pointer">
                            <input
                              {...register("specialties")}
                              type="checkbox"
                              value="stage"
                              className="checkbox"
                            />
                            <span className="label-text">Stage / lighting</span>
                          </label>
                        </div>
                      </div>

                      <div className="">
                        <label className="label">Service Area / City</label>
                        <input
                          {...register("serviceArea", {
                            required: "Service area is required",
                          })}
                          type="text"
                          className={`input w-full ${
                            errors.serviceArea ? "input-error" : ""
                          }`}
                          placeholder="e.g., Dhaka, Chittagong, Sylhet"
                        />
                        {errors.serviceArea && (
                          <p className="text-xs text-error">
                            {errors.serviceArea.message}
                          </p>
                        )}
                      </div>

                      <div className="">
                        <label className="label">Available Days</label>
                        <select
                          {...register("availableDays", {
                            required: "Please select your availability",
                          })}
                          className={`select w-full ${
                            errors.availableDays ? "select-error" : ""
                          }`}
                        >
                          <option value="">Select Availability</option>
                          <option value="weekdays">Weekdays only</option>
                          <option value="weekends">Weekends only</option>
                          <option value="both">
                            Both weekdays and weekends
                          </option>
                        </select>
                        {errors.availableDays && (
                          <p className="text-xs text-error">
                            {errors.availableDays.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-red-500 mb-4">{error}</p>}

                  <button
                    type="submit"
                    className="btn btn-secondary text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}
                  </button>

                  <p className="text-center mt-4 text-sm text-gray-600">
                    Your application will be reviewed within 2-3 business days.
                    We'll contact you via email with the decision.
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

export default Decorator;
