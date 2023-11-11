import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth_Style/ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id, token } = useParams();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Add logic to validate the password and confirm password
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`/api/auth/reset-password`, {
        id,
        token,
        password,
      });

      if (res && res.data.success) {
        setSuccess('Password reset successfully!');
        navigate('/login');
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div className="reset-password-container">
      {/* <h2>{`Reset Password for ID: ${id} and Token: ${token}`}</h2> */}
      <form onSubmit={handleResetPassword}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
