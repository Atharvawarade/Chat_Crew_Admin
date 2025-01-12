// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
  authDomain: "student-assistance-chatbot.firebaseapp.com",
  projectId: "student-assistance-chatbot",
  storageBucket: "student-assistance-chatbot.firebasestorage.app",
  messagingSenderId: "580188102556",
  appId: "1:580188102556:web:f3b221ec0222495786b259",
  measurementId: "G-1D5NCR4SFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    // Firebase Login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");

    // Check if the user is an admin or a college user
    if (email.includes("admin@dte")) {
      // Redirect admin to admin dashboard
      window.location.href = "../admin-dashboard/index.html";
    } else {
      // Redirect college user to college dashboard
      window.location.href = "../college-dashboard/college-dashboard.html";
    }
  } catch (error) {
    alert(`Login Failed: ${error.message}`);
  }
});

// Register Form Submission
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    // Firebase Signup
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup Successful!");

    // Automatically log in and redirect to college dashboard
    window.location.href = "../college-dashboard/college-dashboard.html";
  } catch (error) {
    alert(`Signup Failed: ${error.message}`);
  }
});
