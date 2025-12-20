import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loder from "../Components/Loder";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { motion } from 'framer-motion';



const Login = () => {
    const {signInUser, signInWithGoogle, loading} = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
     const [err, setErr] = useState(null);
     const [showPass, setShowPass] = useState(false);
     const [email, setEmail] = useState('')
     const axiosSecure = useAxiosSecure()

    // //default direct after login
    // const from = (location.state || '/');
    console.log(location);
    

  const handleSubmit = (e) =>{
    e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
     
      //console.log(email, password);
      setErr(null)
      signInUser(email, password)
      .then(() =>{
        //console.log(result);
        navigate(location.state || '/')
        //toast.success('Logged in successfully! 🎉');
      })
      .catch(err => {
        //toast.error(err.message);
        setErr(err)
      })
      
  }
   const handleGoogleSignIn = () =>{
         signInWithGoogle()
         .then(result => {
            console.log(result.user);
           //toast.success('Logged in successfully! 🎉');

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
            //toast.error(err.message);
            console.log(err);
            
            
         })
    }

    const handlePasswordShow = e =>{
      e.preventDefault();
      setShowPass(!showPass)
    }

    const handleForgetPassword = (e) =>{
      e.preventDefault();
      navigate('/forgetPassword', {state: { email: email,  from: location.state?.from?.pathname || '/'}})
     
    }

   
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-[#EBD5AB]/20 py-12 px-4"
      >
        <div><title>Log in</title></div>
        {
          loading ? (<Loder></Loder>) : (
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Login Form */}
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full order-2 lg:order-1"
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
                      <h2 className="text-4xl font-bold text-[#1B211A] mb-2">Welcome Back</h2>
                      <p className="text-gray-600">Sign in to your account</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Email Field */}
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}  
                          name='email' 
                          type="email" 
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#628141] focus:outline-none transition-all duration-300" 
                          placeholder="your.email@example.com" 
                        />
                      </motion.div>

                      {/* Password Field */}
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className='relative'>
                          <motion.input 
                            whileFocus={{ scale: 1.02 }}
                            name='password' 
                            type={showPass ? 'text' : "password"} 
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#628141] focus:outline-none transition-all duration-300" 
                            placeholder="Enter your password" 
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
                      </motion.div>

                      {/* Forgot Password */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="text-right"
                      >
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          type="button" 
                          onClick={handleForgetPassword} 
                          className="text-[#628141] hover:text-[#1B211A] font-semibold text-sm transition-colors"
                        >
                          Forgot password?
                        </motion.button>
                      </motion.div>

                      {/* Error Message */}
                      {err && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1, x: [-10, 10, -10, 10, 0] }}
                          transition={{ duration: 0.4 }}
                          className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl'
                        >
                          Please provide a valid Email or Password!
                        </motion.div>
                      )}
                      
                      {/* Login Button */}
                      <motion.button 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit" 
                        className="w-full bg-[#628141] hover:bg-[#1B211A] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Sign In
                      </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
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
                      transition={{ duration: 0.6, delay: 1.0 }}
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
                      Sign in with Google
                    </motion.button>

                    {/* Sign Up Link */}
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      className="text-center text-gray-600 mt-6"
                    >
                      Don't have an account? 
                      <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                        <Link className='text-[#628141] font-semibold hover:text-[#1B211A] ml-1' to='/auth/register' state={location.state}>Sign up</Link>
                      </motion.span>
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Right Side - Welcome Section */}
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden lg:block order-1 lg:order-2"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-[#628141] to-[#1B211A] rounded-3xl p-12 text-white shadow-2xl h-full flex flex-col justify-center"
                  >
                    <motion.h1 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-5xl font-bold mb-6"
                    >
                      Hello Again!
                    </motion.h1>
                    <motion.p 
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-xl mb-8 text-[#EBD5AB]"
                    >
                      Welcome back to our decoration service platform. We're excited to see you again!
                    </motion.p>
                    <div className="space-y-4">
                      {[
                        { text: "Secure Login", delay: 0.4, icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                        { text: "Quick Access", delay: 0.5, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                        { text: "Personalized Experience", delay: 0.6, icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.2, }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <motion.div 
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                          </motion.div>
                          <p className="text-lg">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )
        }
      </motion.div>
    );
};

export default Login;