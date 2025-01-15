import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
    authDomain: "student-assistance-chatbot.firebaseapp.com",
    projectId: "student-assistance-chatbot",
    storageBucket: "student-assistance-chatbot.appspot.com",
    messagingSenderId: "580188102556",
    appId: "1:580188102556:web:f3b221ec0222495786b259",
    measurementId: "G-1D5NCR4SFK",
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
      console.error("No data available for CollegesData.");
    }
  } catch (error) {
    console.error("Error fetching colleges:", error);
  }
}

registerNameDropdown.addEventListener("change", (event) => {
  const selectedOption = event.target.selectedOptions[0];
  const email = selectedOption.dataset.email;
  registerEmailInput.value = email || "";
});

// Populate dropdown on page load
fetchColleges();
