import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "../../assets/css/Register.css";

const Register = () => {
  const [UserName, setUserName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);
  const navigate = useNavigate();

  const checkUsername = async () => {
    try {
      const response = await axios.post("http://localhost:5000/check-username", { UserName });
      setUsernameExists(response.data.exists);
      if (response.data.exists) {
        setError("Username already exists");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setError("Error checking username");
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/check-email", { Email });
      setEmailExists(response.data.exists);
      if (response.data.exists) {
        setError("Email already exists");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setError("Error checking email");
    }
  };

  const checkPhoneNumber = async () => {
    try {
      const response = await axios.post("http://localhost:5000/check-phone", { PhoneNumber });
      setPhoneNumberExists(response.data.exists);
      if (response.data.exists) {
        setError("Phone number already exists");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      setError("Error checking phone number");
    }
  };

  const controlSubmit = async (e) => {
    e.preventDefault();
    if (usernameExists || emailExists || phoneNumberExists) {
      setError("Please fix the errors before submitting");
      return;
    }
    if (!UserName || !FirstName || !LastName || !Password || !Email || !PhoneNumber || !Address) {
      setError("All fields are required");
      return;
    }

    const data = { UserName, FirstName, LastName, Password, Email, PhoneNumber, Address };
    try {
      const response = await axios.post("http://localhost:5000/signup", data);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed");
    }
  };

  return (
    <div className="register">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={controlSubmit}>
        <h2>Registration</h2>
        <div className="label-box">
          <label htmlFor="FirstName">First Name</label>
          <input
            name="FirstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="FirstName"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="LastName">Last Name</label>
          <input
            name="LastName"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="LastName"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="UserName">Username</label>
          <input
            name="UserName"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={checkUsername} // Check username on blur
            type="text"
            id="UserName"
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="Email">Email</label>
          <input
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmail} // Check email on blur
            type="email"
            id="Email"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="PhoneNumber">Phone Number</label>
          <input
            name="PhoneNumber"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={checkPhoneNumber} // Check phone number on blur
            type="number"
            id="PhoneNumber"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="Address">Address</label>
          <input
            name="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="Address"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="label-box">
          <label htmlFor="Password">Password</label>
          <input
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="Password"
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="term">
          <label>
            <input type="checkbox" required />I agree to the terms & conditions
          </label>
        </div>
        <button type="submit" className="btn btn-success" disabled={usernameExists || emailExists || phoneNumberExists}>
          Register
        </button>
        <div className="login-link">
          <p>
            Already have an account?
            <Link to="/" className="r">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
