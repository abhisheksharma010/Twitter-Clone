import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../Auth_Style/register.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`/api/auth/signup`, {
        name,
        email,
        password
      });
      if (res && res.data.success) {
        navigate("/profile");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuth = async () => {
    try {
      const res = await axios.get(`/api/auth/google`);
      if (res && res.data.url) {
        window.location.href = res.data.url;
      } else {
        console.log('Failed to initiate Google authentication');
      }
    } catch (error) {
      console.error('Error initiating Google authentication:', error);
    }
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
      <p className={styles.text}>or</p>
      <button className={styles.google_btn} onClick={googleAuth}>
        <img src="./images/google.png" alt="google icon" />
        <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default Register;
