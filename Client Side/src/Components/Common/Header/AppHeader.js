import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../../assets/css/AppHeader.css';
import  MyImage from './notification.svg'

const AppHeader = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/notifications")
      .then((result) => setData(result.data))
      .catch((error) => console.log(error));
  }, []);

    return (
    <div> 
        <nav className="header_bg">
    <div className="container">
        <h3>Student Admin Dashboard</h3>
      <select className='drop'>
      <option value="profile">My Profile</option>
      <option value="logout">LogOut</option>
     </select>
     <div className="logo">
        <img src= {MyImage} />
        <span className="badge">4</span>
      </div>
    </div>
    </nav>

    </div>
 );
}

export default AppHeader;