import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { LucideEye, LucideEyeClosed } from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../Hooks/useAxiosSecure';

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
    <div>
      <div><title>Register</title></div>
      <div className="my-10 min-h-screen">
        <div className="flex-col flex justify-center items-center gap-5">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Registration now!</h1>
          </div>
          <div className="card bg-secondary/25 w-full max-w-md shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset ">
                  <label className="label">Name</label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 5,
                        message: "Name should be more than 5 characters"
                      }
                    })}
                    type="text"
                    className={`input w-full ${errors.name ? 'input-error' : ''}`}
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}

                  {/* Photo URl  */}
                  <label className="label">Photo URl </label>
                  <input
                    {...register("photo", {
                      required: "Photo is required"
                    })}
                    type="file"
                    className={`file-input w-full ${errors.photo ? 'input-error' : ''}`}
                    placeholder="Choose a Photo"
                  />
                  {errors.photo && <p className="text-xs text-error">{errors.photo.message}</p>}

                  <label className="label">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className={`input w-full ${errors.email ? 'input-error' : ''}`}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}

                  <label className="label">Password</label>
                  <div className='relative'>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]).{6,}$/,
                          message: "Password must be at least 6 characters long, include one uppercase, one lowercase and special character"
                        }
                      })}
                      type={showPass ? 'text' : "password"}
                      className={`input w-full ${errors.password ? 'input-error' : ''}`}
                      placeholder="Password"
                    />
                    <button onClick={handlePasswordShow} className='text-2xl top-2 text-center absolute z-10 right-5'>{showPass ? <LucideEye></LucideEye> : <LucideEyeClosed></LucideEyeClosed>}</button>
                  </div>
                  {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}

                  <div>
                    <label className="label">
                      <input
                        {...register("terms", {
                          required: "Please accept our terms and conditions"
                        })}
                        type="checkbox"
                        className="checkbox"
                      />
                      Accept our terms and condition
                    </label>
                    {errors.terms && <p className="text-xs text-error">{errors.terms.message}</p>}
                  </div>

                  {success && <p className='text-green-500'>Account Created Successfully</p>}
                  {error && <p className='text-red-500'>{error}! Please provide a valid email or password</p>}
                  
                  <button type="submit" className="btn btn-secondary text-white mt-4">Register</button>

                  <button type='button' onClick={handleGoogleSignIn} className="btn bg-black text-white border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                  </button>

                  <p>Already have an account ? Please
                    <Link className='text-secondary' to='/auth/login' state={location.state}>Sign in</Link></p>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;