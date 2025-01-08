// Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';

const Register = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const collegeDocRef = doc(db, 'CollegesData', collegeName);
      await setDoc(collegeDocRef, { email, collegeName });
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper shadow-lg">
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="collegeName" className="form-label">College Name</label>
            <input
              type="text"
              className="form-control"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{' '}
          <button
            className="btn btn-link"
            onClick={onSwitchToLogin}
          >
            Login Here
          </button>
        </p>
      </div>
      <div className="illustration"></div>
    </div>
  );
};

export default Register;