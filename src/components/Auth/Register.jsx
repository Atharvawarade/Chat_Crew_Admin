import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Auth.css';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add college data to Firestore with the document ID as the college name
      const collegeDocRef = doc(db, 'CollegesData', collegeName); // Sets document ID to collegeName
      await setDoc(collegeDocRef, {
        email: email,
        collegeName: collegeName,
      });

      alert('Registration successful!');
      onRegisterSuccess(collegeName); // Pass college name to App.jsx
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
