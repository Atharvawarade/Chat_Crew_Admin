import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

const Login = ({ onLoginFailed, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Mock logic for setting collegeName, replace with actual logic
      const collegeName = email.split('@')[0]; // Example: derive collegeName from email

      // Save collegeName to sessionStorage
      sessionStorage.setItem('collegeName', collegeName);

      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.message);
      onLoginFailed();
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={onSwitchToRegister} className="switch-button">
        Switch to Register
      </button>
    </div>
  );
};

export default Login;
