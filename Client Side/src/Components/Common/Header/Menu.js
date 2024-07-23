import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserEdit, FaTable, FaEnvelope } from 'react-icons/fa';
import '../../../assets/css/Menu.css';

export default function Menu() {
  return (
    <div>
      <div className="sidebar">
        <Link to="/UserRole">
          <FaUser /> Role
        </Link>
        <Link to="/StudentRole">
          <FaUserEdit /> Registration Form
        </Link>
        <Link to="/StudentTable">
          <FaTable /> All Students
        </Link>
       <Link to="#contact">
          <FaEnvelope /> Contact
        </Link>
        <Link to="/superadmin">
          <FaTable /> SuperAdmin
        </Link>
      </div>
    </div>
  );
}
