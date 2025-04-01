import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import "../Styles/login.css"; // Using the same styles as login.css
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import logo_light from "../assets/logo-black.png";

const Profile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
  }, [userData]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://quiz-app-es5n.onrender.com/api/auth/updateProfile",
        { name, email },
        { withCredentials: true }
      );

      if (data.success) {
        setUserData({ ...userData, name, email });
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img onClick={() => navigate("/")} src={logo_light} alt="logo" className="logo" />
      <div className="form-container">
        <h2 className="title">Profile</h2>
        <p className="subtitle">Update your account details</p>

        {/* Name Input */}
        <div className="input-group">
          <img src={assets.person_icon} alt="person" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </div>

        {/* Email Input (Read-only) */}
        <div className="input-group">
          <img src={assets.mail_icon} alt="email" />
          <input
            type="email"
            value={email}
            readOnly
            placeholder="Email ID"
          />
        </div>

        {/* Update Button */}
        <button onClick={updateProfile} className="login-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
