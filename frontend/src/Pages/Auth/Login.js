// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth_Style/login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = () => {
    // Simulating a simple authentication logic
    if (username === 'demo' && password === 'password') {
      setLoginStatus('success');
    } else {
      setLoginStatus('failure');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <p className="error-message">Invalid username or password. Please try again.</p>
      )}
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
