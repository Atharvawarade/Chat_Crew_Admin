// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);

// Fetch college data from Firebase and populate the dropdown
const registerNameDropdown = document.getElementById("registerName");
const registerEmailInput = document.getElementById("registerEmail");

async function fetchColleges() {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, "CollegesData"));
    if (snapshot.exists()) {
      const collegesData = snapshot.val();
      registerNameDropdown.innerHTML =
        '<option value="" disabled selected>Select College</option>';
      for (const [collegeName, collegeInfo] of Object.entries(collegesData)) {
        const option = document.createElement("option");
        option.value = collegeName;
        option.textContent = collegeName;
        option.dataset.email = collegeInfo.email;
        registerNameDropdown.appendChild(option);
      }
    } else {
      console.error("No data available for CollegesData");
    }
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
  }
}

// Update email input when a college is selected
registerNameDropdown?.addEventListener("change", (event) => {
  const selectedOption = event.target.selectedOptions[0];
  const email = selectedOption.dataset.email;
  registerEmailInput.value = email || "";
});

// Call fetchColleges to populate the dropdown on page load
fetchColleges();

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    // Check if email exists in CollegesData
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "CollegesData"));
    if (snapshot.exists()) {
      const collegesData = snapshot.val();
      const collegeEntry = Object.values(collegesData).find(
        (college) => college.email === email
      );

      if (collegeEntry) {
        // Firebase Login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");

        // Set session variable
        sessionStorage.setItem("college-login", true);
        sessionStorage.setItem("collegeName", collegeEntry.collegeName);

        // Redirect based on user type
        if (email.includes("admin@dte")) {
          window.location.href = "../admin-dashboard/index.html";
        } else {
          window.location.href = "../college-dashboard/index.html";
        }
      } else {
        alert("Email not associated with any college in the database.");
      }
    } else {
      alert("No CollegesData found in the database.");
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
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup Successful!");

    // Set session variables
    sessionStorage.setItem("college-login", true);
    sessionStorage.setItem("collegeName", name);

    // Redirect to college dashboard
    window.location.href = "../college-dashboard/index.html";
  } catch (error) {
    alert(`Signup Failed: ${error.message}`);
  }
});
