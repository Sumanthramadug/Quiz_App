import React, { useContext } from 'react';
import '../Styles/Navbar.css';
import logo_light from '../assets/logo-black.png';
import search_icon_light from '../assets/search-w.png';
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const Navbar = () => {
  const navigate = useNavigate();
  const {userData,setIsLoggedIn,setUserData} = useContext(AppContext);
  // const logout = async()=>{
  //   try{
  //     const {data} = await axios.post('https://quiz-app-es5n.onrender.com/api/auth/logout',{},{withCredentials:true});
  //     if(data.success){
  //       setIsLoggedIn(false);
  //       setUserData(false);
  //       navigate("/");
  //       toast.success(data.message);
  //     }
  //     else{
  //       toast.error(data.message);
  //     }
  //   }
  //   catch(error){
  //     toast.error(error.mesage);
  //   }
  // }
  return (
    <div className="Navbar">
      <img src = {logo_light} alt="" className="logo" />

      {/* Search Box (Centered) */}
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={ search_icon_light} alt="" />
      </div>

      {/* Navigation Links (Right-Aligned) */}
      <div className="nav-links">
        <ul>
          <li onClick={()=>{navigate("/")}}>Home</li>
          <li onClick={()=>{navigate("/instructions")}}>Instructions</li>
          <li>Features</li>
          {userData ? 
          <div className="user-container">
          {userData.name?.[0]?.toUpperCase() || "U"} {/* Fallback to "U" if userData.name is missing */}
          <div className="dropdown">
            <ul>
              {userData.Authenticated ? 
                <li className="dropdown-btn" onClick={logout}>Logout</li> 
                :
                <>
                  <li className="dropdown-btn" onClick={() => navigate('/Profile')}>Profile</li>
                  <li className="dropdown-btn" onClick={logout}>Logout</li>
                </>
              }
            </ul>
          </div>
        </div>
          : 
          <li className="fg-btn" onClick={()=>{navigate("/login")}}>Login</li>}
        </ul>
      </div>

    </div>
  );
};

export default Navbar;
