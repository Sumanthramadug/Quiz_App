import React, { useState } from 'react';
import { assets } from '../assets/assets';
import '../Styles/forgotPassword.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const resetPassword = async () => {
    try {
      const { data } = await axios.post("https://quiz-app-4-06sl.onrender.com/api/auth/forgotPassword", { email }, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        setShowOtpField(true); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkOtp = async () => {
    try {
      const { data } = await axios.post("https://quiz-app-4-06sl.onrender.com/api/auth/verifyForgotPassword", { email, otp }, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        navigate("/newPassword", { state: { email } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h1>Reset Password</h1>
        <p>Enter your email to reset your password</p>

        {/* Email Input Field */}
        <div className='input-group'>
          <img src={assets.mail_icon} alt='email' />
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            placeholder='Email ID' 
            required
          />
        </div>

        {/* Submit Button */}
        <button onClick={resetPassword} className="btn-primary">Submit</button>

        {/* OTP Field and Submit Button (Initially Hidden) */}
        {showOtpField && (
          <div className="otp-container">
            {/* OTP Input Field */}
            <input 
              onChange={(e) => setOtp(e.target.value)} 
              className='otp-input' 
              type='text' 
              placeholder='Enter OTP' 
              required
            />
            
            {/* Submit Button */}
            <button onClick={checkOtp} className="btn-primary">Check OTP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
