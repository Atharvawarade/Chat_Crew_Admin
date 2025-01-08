import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

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
      <div className="background-animation"></div>
      <div className="circle glass circle1"></div>
      <div className="circle glass circle2"></div>
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="collegeName">College Name</label>
              <input
                type="text"
                id="collegeName"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="toggle-link">
          <p>
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
