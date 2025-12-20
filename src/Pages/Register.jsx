import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { LucideEye, LucideEyeClosed } from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const Registration = () => {
  const { createUser, setUser, signInWithGoogle, updateUserProfile } = use(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShoePass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, name, photo, terms } = data;
    const profileImg = photo[0]
    setError('');
    setSuccess(false);

    try {
      const result = await createUser( email, password, terms );
      const user = result.user;
      // handle image uploades
      const formData = new FormData()
      formData.append( "image", profileImg )
      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
      
      axios.post(imageAPI, formData)
      .then(res => {
        console.log("after data upload", res);
        // create User data
        const userInfo = {
          email: email,
          displayName: name,
          photoURL: res.data.data.url,
        }
        axiosSecure.post('/users', userInfo)
        .then(res => {
          if(res.data.insertedId){
            console.log("user created", res.data);
          }
        })        

        // update user profile
        updateUserProfile();
        setUser({ ...user, displayName: name, photoURL: res.data.data.url });
        setSuccess(true);
        setError('');
        reset();
        navigate(location.state || '/');
      })
    } catch (error) {
      console.log(error);
      setError(error.message);
      setSuccess(false);
    }
  };

  const handlePasswordShow = e => {
    e.preventDefault();
    setShoePass(!showPass)
  }
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        //toast.success("Sign up successfull")
        console.log(result.user);
        
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        }
        
        axiosSecure.post('/users', userInfo)
        .then(res =>{
          console.log("user added to list", res.data);
          navigate(location.state || '/')
        })

      })
      .catch(err => {
        console.log(err);
        //toast.error(err.message)
      })
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-[#EBD5AB]/20 py-12 px-4"
    >
      <div><title>Register</title></div>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Welcome Section */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#628141] to-[#1B211A] rounded-3xl p-12 text-white shadow-2xl h-full flex flex-col justify-center"
            >
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl font-bold mb-6"
              >
                Welcome!
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl mb-8 text-[#EBD5AB]"
              >
                Join our community and discover amazing decoration services for your special events.
              </motion.p>
              <div className="space-y-4">
                {[
                  { text: "Professional Decorators", delay: 0.6 },
                  { text: "Affordable Packages", delay: 0.7 },
                  { text: "Trusted Service", delay: 0.8 }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2,  }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <motion.div 
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <p className="text-lg">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10"
            >
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl font-bold text-[#1B211A] mb-2">Create Account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
              </motion.div>

              <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                {/* Name Field */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    animate={errors.name ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 5,
                        message: "Name should be more than 5 characters"
                      }
                    })}
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Photo Upload */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    animate={errors.photo ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    {...register("photo", {
                      required: "Photo is required"
                    })}
                    type="file"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.photo ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#628141]/10 file:text-[#628141] file:font-semibold hover:file:bg-[#628141]/20 file:transition-all file:duration-300`}
                  />
                  {errors.photo && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.photo.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    animate={errors.email ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className='relative'>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      animate={errors.password ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).{6,}$/,
                          message: "Password must be at least 6 characters long, include one uppercase, one lowercase and special character"
                        }
                      })}
                      type={showPass ? 'text' : "password"}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-[#628141] focus:outline-none transition-all duration-300`}
                      placeholder="Create a strong password"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button" 
                      onClick={handlePasswordShow} 
                      className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#628141] transition-colors'
                    >
                      {showPass ? <LucideEye className="w-5 h-5"></LucideEye> : <LucideEyeClosed className="w-5 h-5"></LucideEyeClosed>}
                    </motion.button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Terms Checkbox */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.label 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      {...register("terms", {
                        required: "Please accept our terms and conditions"
                      })}
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-gray-300 text-[#628141] focus:ring-[#628141] transition-all duration-300"
                    />
                    <span className="text-sm text-gray-700">I accept the <span className="text-[#628141] font-semibold">terms and conditions</span></span>
                  </motion.label>
                  {errors.terms && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.terms.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Success/Error Messages */}
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl'
                  >
                    Account Created Successfully!
                  </motion.div>
                )}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, x: [-10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl'
                  >
                    {error}! Please provide valid credentials
                  </motion.div>
                )}
                
                {/* Register Button */}
                <motion.button 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="w-full bg-[#628141] hover:bg-[#1B211A] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </motion.button>

                {/* Divider */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="relative my-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </motion.div>

                {/* Google Sign In */}
                <motion.button 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='button' 
                  onClick={handleGoogleSignIn} 
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl border-2 border-gray-200 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <motion.svg 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    aria-label="Google logo" 
                    width="20" 
                    height="20" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                  >
                    <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
                  </motion.svg>
                  Sign up with Google
                </motion.button>

                {/* Sign In Link */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="text-center text-gray-600 mt-6"
                >
                  Already have an account? 
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                    <Link className='text-[#628141] font-semibold hover:text-[#1B211A] ml-1' to='/auth/login' state={location.state}>Sign in</Link>
                  </motion.span>
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;