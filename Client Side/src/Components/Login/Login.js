import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/Login.css";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const controlSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    const data = {
      UserName: username,
      Password: password,
    };
    console.log(data);
    try {
      await axios.post(`http://localhost:5000/login`, data).then((res) => {
        console.log(res.data.message);
        if (res.statusText != "OK") {
          throw new Error("Invalid username or password");
        } else {
          //insert sesion storage
          

          navigate("/userRole");
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <div className="input-box">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            type="text"
            id="username"
            required
          />
        </div>
        <br />
        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            id="password"
            required
          />
        </div>
        <br />
        <div className="rem-for">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button onClick={controlSubmit} type="submit" className="btn">
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="register-link">
          <p>
            Don't have an account?
            <Link to="/register" className="r">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
