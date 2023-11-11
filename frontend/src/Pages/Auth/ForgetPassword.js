import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
         const res = await axios.post('/api/auth/forgot-password',{
        email,
      })
      if(res && res.data.success){
        
        console.log("donses");
      }
      else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);

      
    }
    // Add logic to handle the submission, such as sending a request to the backend.
    console.log(`Email submitted: ${email}`);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
