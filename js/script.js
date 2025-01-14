// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
    const user = userCredential.user;

    // Check if user is admin
    if (email.includes("admin@dte")) {
      sessionStorage.setItem("isAdminLoggedIn", "true");
      alert("Admin Login Successful!");
      window.location.href = "../admin-dashboard/index.html"; // Redirect to dashboard
    } else {
      alert("Access Denied: You are not an admin.");
    }
  } catch (error) {
    alert(`Login Failed: ${error.message}`);
  }
});

// Session Validation for Admin Dashboard
if (window.location.pathname.includes("admin-dashboard")) {
  onAuthStateChanged(auth, (user) => {
    const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
    if (!user || !isAdminLoggedIn) {
      alert("Access Denied: Please log in as admin.");
      window.location.href = "../Auth/admin-login.html"; // Redirect to login page
    }
  });
}

// Logout Functionality (Optional)
document.getElementById("logoutButton")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem("isAdminLoggedIn");
    alert("Logout Successful!");
    window.location.href = "../Auth/admin-login.html"; // Redirect to login page
  } catch (error) {
    alert(`Logout Failed: ${error.message}`);
  }
});
