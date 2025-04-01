import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import '../Styles/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import logo_light from '../assets/logo-black.png'
import { AppContext } from '../Context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const [state,setState] = useState('SignUp');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {setIsLoggedIn,getUserData} = useContext(AppContext);


  const submitHandler = async (e) =>{
    e.preventDefault();
    axios.defaults.withCredentials = true
    if(state === 'SignUp'){
        try{
          const {data} = await axios.post('http://localhost:7000/api/auth/register',{name,email,password},{withCredentials:true});
          if(data.success){
            toast.success("User Registered Successful");
            setIsLoggedIn(true);
            navigate("/");
          }
          else{
            toast.error(data.message);
          }
        }
        catch(error){
          toast.error(error.message);
        }
    }
    else{
      try{
        const {data} = await axios.post('http://localhost:7000/api/auth/login',{email,password},{withCredentials:true});
        if(data.success){
          toast.success("User LoggedIn Successful");
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        }
        else{
          toast.error(data.message);
        }
      }
      catch(error){
        toast.error(error.message);
      }
    }
}

  return (
    <div className="container">
      <img onClick={()=>{navigate("/")}} src={logo_light} alt="logo" className="logo" />
      <div className="form-container">
        <h2 className="title">{state === 'SignUp' ? 'Create Account' : 'Login' }</h2>
        <p className="subtitle">{state === 'SignUp' ? 'Create your Account' : 'Login to your Account' }</p>
        <form onSubmit={submitHandler}>
          {state === 'SignUp' && (
          <div className="input-group">
            <img src={assets.person_icon} alt="person" />
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Full Name" required />
          </div>
        )}

          {/* Email */}
          <div className="input-group">
            <img src={assets.mail_icon} alt="email" />
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email id" required />
          </div>

          {/* Password */}
          <div className="input-group">
            <img src={assets.lock_icon} alt="password" />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" required />
          </div>

          <p onClick={()=>{navigate("/forgotPassword")}} className="forgot-password">Forgot Password?</p>

          {/* Submit */}
          <button type="submit" className="login-btn">
            {state}
          </button>
        </form>

        {state === 'SignUp' ?  
        <p className="account-text">
          Already have an account? <span onClick={()=>{setState('Login')}} className="link">Login here</span>
        </p>
        :
        <p className="account-text">
          Don't have an account? <span onClick={()=>{setState('SignUp')}} className="link">Sign Up</span>
        </p>
        }
      </div>
    </div>
  )
}

export default Login