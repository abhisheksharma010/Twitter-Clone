// Login.js

import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../Auth_Style/login.css';
import axios from 'axios';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();
  

  const handleLogin = async () => {
  console.log('clicked');
    try {
      const res = await axios.post('/api/auth/login',{
        email,
        password,
      })
      if(res && res.data.success){
        
        console.log("donses");
        navigate("/profile");
      }
      else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // Simulating a simple authentication logic
    
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {loginStatus === 'success' && (
        <p className="success-message">Login successful!</p>
      )}
      {loginStatus === 'failure' && (
        <p className="error-message">Invalid email or password. Please try again.</p>
      )}
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
