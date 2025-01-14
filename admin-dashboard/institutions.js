import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
  authDomain: "student-assistance-chatbot.firebaseapp.com",
  databaseURL: "https://student-assistance-chatbot-default-rtdb.firebaseio.com/",
  projectId: "student-assistance-chatbot",
  storageBucket: "student-assistance-chatbot.appspot.com",
  messagingSenderId: "580188102556",
  appId: "1:580188102556:web:f3b221ec0222495786b259",
  measurementId: "G-1D5NCR4SFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "institutions.css"; // Path to your CSS file
document.head.appendChild(cssLink);


export default function loadInstitutions(container) {
  // Initial HTML structure for the table
  let html = `
    
    <div class="container">
    <div class="header-container">
      <h1 class="header-title">Colleges Data</h1>
      <button class="btn btn-success btn-sm add-college-btn" data-bs-toggle="modal" data-bs-target="#addCollegeModal">Add College</button>
    </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-striped">
            <thead>
              <tr>  
                <th>#</th>
                <th>Institution Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="institutionsTableBody">
              <!-- Rows will be dynamically added here -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal for Adding College -->
    <div class="modal fade" id="addCollegeModal" tabindex="-1" aria-labelledby="addCollegeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addCollegeModalLabel">Add College</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="addCollegeForm">
          <div class="row g-3">
            <!-- Institution Name -->
            <div class="col-md-12">
              <div class="coolinput">
                <label for="institutionName" class="text">Institution Name:</label>
                <input type="text" placeholder="Enter institution name" id="institutionName" class="input" required>
              </div>
            </div>

            <!-- Email and Principal Name -->
            <div class="col-md-6">
              <div class="coolinput">
                <label for="email" class="text">Email:</label>
                <input type="text" placeholder="Enter email" id="email" class="input" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="coolinput">
                <label for="principalName" class="text">Principal Name:</label>
                <input type="text" placeholder="Enter principal name" id="principalName" class="input" required>
              </div>
            </div>

            <!-- AISHE Code and AICTE Code -->
            <div class="col-md-6">
              <div class="coolinput">
                <label for="aisheCode" class="text">AISHE Code:</label>
                <input type="text" placeholder="Enter AISHE code" id="aisheCode" class="input" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="coolinput">
                <label for="aicteCode" class="text">AICTE Code:</label>
                <input type="text" placeholder="Enter AICTE code" id="aicteCode" class="input" required>
              </div>
            </div>

            <!-- Location -->
            <div class="col-md-12">
              <div class="coolinput">
                <label for="location" class="text">Location:</label>
                <input type="text" placeholder="Enter location" id="location" class="input" required>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-3">
            <button type="submit" class="btn btn-primary w-100">Add College</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  `;

  container.innerHTML = html;

  // Fetch data from Firebase Realtime Database
  const dbRef = ref(database);
  get(child(dbRef, "CollegesData"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const collegesData = snapshot.val();
        const tableBody = document.getElementById("institutionsTableBody");

        // Get the college names directly from the keys
        const institutionKeys = Object.keys(collegesData);

        // Populate the table with college names from the keys
        let index = 1;
        institutionKeys.forEach((key) => {
          const row = `
            <tr>
              <td>${index++}</td>
              <td>${key}</td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="editCollege('${key}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCollege('${key}')">Delete</button>
              </td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      } else {
        alert("No data found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Handle Add College Form Submission
  const addCollegeForm = document.getElementById("addCollegeForm");
  addCollegeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const institutionName = document.getElementById("institutionName").value;
    const email = document.getElementById("email").value;
    const aisheCode = document.getElementById("aisheCode").value;
    const aicteCode = document.getElementById("aicteCode").value;
    const principalName = document.getElementById("principalName").value;
    const location = document.getElementById("location").value;

    const newCollege = {
      email,
      aisheCode,
      aicteCode,
      principalName,
      location,
    };

    const newCollegeRef = ref(database, `CollegesData/${institutionName}`);
    set(newCollegeRef, newCollege)
      .then(() => {
        alert("College added successfully!");
        location.reload(); // Refresh the page to show the updated data
      })
      .catch((error) => {
        console.error("Error adding college:", error);
      });
  });

  // Helper functions for actions
  window.editCollege = function (key) {
    alert(`Edit College: ${key}`);
    // Implement edit functionality as needed
  };

  window.deleteCollege = function (key) {
    alert(`Delete College: ${key}`);
    // Implement delete functionality as needed
  };
}
