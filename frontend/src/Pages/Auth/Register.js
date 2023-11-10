// Signup.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth_Style/register.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleRegister = async () => {
    try {
      const res = await axios.post(`/api/auth/signup`,{
        name,
        email,
        password
      });
      if(res && res.data.success){
        navigate("/profile");
      }
      else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // api/auth/signup
  
    // You would typically send a request to your backend to create a new user here
    // console.log('Registering with:', { name, email, password });
    // Add your registration logic here
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <form>
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
