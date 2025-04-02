import React, { useState } from 'react';
import { assets } from '../assets/assets';
import '../Styles/newPassword.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo_light from '../assets/logo-black.png';

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from previous page

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please enter all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('https://quiz-app-4-06sl.onrender.com/api/auth/changePassword', {
        email,
        password,
        confirmPassword
      });

      if (data.success) {
        toast.success('Password changed successfully');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="container">
      <img onClick={() => navigate('/')} src={logo_light} alt="logo" className="logo" />
      <div className="form-container">
        <h2 className="title">Reset Password</h2>
        <p className="subtitle">Enter your new password</p>
        <form onSubmit={submitHandler}>
          {/* Password */}
          <div className="input-group">
            <img src={assets.lock_icon} alt="password" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New Password" required />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <img src={assets.lock_icon} alt="password" />
            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
