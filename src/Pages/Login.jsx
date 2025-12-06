import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loder from "../Components/Loder";
import { LucideEye, LucideEyeClosed } from "lucide-react";



const Login = () => {
    const {signInUser, signInWithGoogle, loading} = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
     const [err, setErr] = useState(null);
     const [showPass, setShowPass] = useState(false);
     const [email, setEmail] = useState('')
     

    //default direct after login
    const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) =>{
    e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
     
      //console.log(email, password);
      setErr(null)
      signInUser(email, password)
      .then(() =>{
        //console.log(result);
        navigate(from, {replace:true})
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
            navigate(from, {replace:true})
           //toast.success('Logged in successfully! 🎉');
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
      <div>
        <div><title>Log in</title></div>
{
  loading ? (<Loder></Loder>) : (<div className="mt-15 min-h-screen">
  <div className=" flex-col flex justify-center items-center ">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary mb-5">Login now!</h1>
    </div>
    <div className="card bg-secondary/30 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>

        <fieldset className="fieldset">
          <label  className="label">Email</label>
          <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}  name='email' 
          type="email" 
          className="input w-full" 
          placeholder="Email" />
          <label className="label">Password</label>
          <div className='relative'>
                    <input name='password' type={showPass ? 'text' : "password"} className="input w-full" placeholder="Password" />
                    <button type="button" onClick={handlePasswordShow} className='text-2xl top-2 text-center absolute z-10 right-5'>{showPass ? <LucideEye></LucideEye> : <LucideEyeClosed></LucideEyeClosed>}</button>
                    </div>
          <button onClick={handleForgetPassword}><a className="button link-hover text-left">Forgot password?</a></button>

          {
            err && <p className="text-red-700">Please provide a valid Email or Password !</p>
          }
          <button className="btn btn-secondary text-white mt-4">Login</button>
        </fieldset>
        </form>
        {/* google */}
        <button type='button' onClick={handleGoogleSignIn} className="btn bg-black text-white border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
<p>Don't have an account? please <Link className='text-secondary' to='/register'>Sign up</Link></p>
      </div>
    </div>
  </div>
</div>

  )
}
       
      </div>
    );
};

export default Login;