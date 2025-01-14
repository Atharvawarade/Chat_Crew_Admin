import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
  authDomain: "student-assistance-chatbot.firebaseapp.com",
  databaseURL:
    "https://student-assistance-chatbot-default-rtdb.firebaseio.com/",
  projectId: "student-assistance-chatbot",
  storageBucket: "student-assistance-chatbot.appspot.com",
  messagingSenderId: "580188102556",
  appId: "1:580188102556:web:f3b221ec0222495786b259",
  measurementId: "G-1D5NCR4SFK",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Inject the CSS file dynamically
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "dashboard.css"; // Path to your CSS file
document.head.appendChild(cssLink);

export default async function loadDashboard(container) {
  const html = `
    <h1 style="text-align: center; margin-bottom: 20px;">Database Summary</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 mb-3">
          <div class="card" id="collegesCard">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../assets/Institutions.jpg" class="img-fluid rounded-start" alt="Main Nodes Icon">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Institutions Registered</h5>
                  <h3 class="card-text" id="innerNodesColleges">0</h3>
                   <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card" id="mainNodesCard">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../assets/Forms.jpg" class="img-fluid rounded-start" alt="Inner Nodes Icon">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Types of Documents</h5>
                  <h3 class="card-text" id="mainNodesMinusOne">0</h3>
                   <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card" id="scholarshipsCard">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../assets/Scholarships.jpg" class="img-fluid rounded-start" alt="Keys Icon">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Scholarships</h5>
                  <h3 class="card-text" id="innerNodesScholarships">0</h3>
                   <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div class="modal fade" id="collegesModal" tabindex="-1" aria-labelledby="collegesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="collegesModalLabel">List of Colleges</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="collegesList"></div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="mainNodesModal" tabindex="-1" aria-labelledby="mainNodesModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mainNodesModalLabel">Names of Main Nodes</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="mainNodesList"></div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="scholarshipsModal" tabindex="-1" aria-labelledby="scholarshipsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="scholarshipsModalLabel">Scholarship Data</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="scholarshipsList"></div>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;

  try {
    // Fetch all data from the database
    const dbRef = ref(db);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // 1. Count inner nodes inside "CollegesData"
      const collegesData = data.CollegesData || {};
      const innerNodesColleges = Object.keys(collegesData).length;

      // 2. Calculate main nodes - 1
      const totalMainNodes = Object.keys(data).length;
      const mainNodesMinusOne = totalMainNodes - 1;

      // 3. Count inner nodes inside "ScholarshipData"
      const scholarshipData = data.ScholarshipData || {};
      const innerNodesScholarships = Object.keys(scholarshipData).length;

      // Update card values
      document.getElementById("innerNodesColleges").innerText =
        innerNodesColleges;
      document.getElementById("mainNodesMinusOne").innerText =
        mainNodesMinusOne;
      document.getElementById("innerNodesScholarships").innerText =
        innerNodesScholarships;

      // Modal event listeners
      document.getElementById("collegesCard").addEventListener("click", () => {
        const collegesList = Object.keys(collegesData)
          .map((key, index) => `<tr><td>${index + 1}</td><td>${key}</td></tr>`)
          .join("");
      
        document.getElementById(
          "collegesList"
        ).innerHTML = `
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Institution Name</th>
              </tr>
            </thead>
            <tbody>
              ${collegesList}
            </tbody>
          </table>
        `;
        new bootstrap.Modal(document.getElementById("collegesModal")).show();
      });
      
      document.getElementById("mainNodesCard").addEventListener("click", () => {
        const mainNodesList = Object.keys(data)
          .map((key, index) => `<tr><td>${index + 1}</td><td>${key}</td></tr>`)
          .join("");
      
        document.getElementById(
          "mainNodesList"
        ).innerHTML = `
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Main Node</th>
              </tr>
            </thead>
            <tbody>
              ${mainNodesList}
            </tbody>
          </table>
        `;
        new bootstrap.Modal(document.getElementById("mainNodesModal")).show();
      });
      
      document.getElementById("scholarshipsCard").addEventListener("click", () => {
        const scholarshipsList = Object.keys(scholarshipData)
          .map((key, index) => `<tr><td>${index + 1}</td><td>${key}</td></tr>`)
          .join("");
      
        document.getElementById(
          "scholarshipsList"
        ).innerHTML = `
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Scholarship Name</th>
              </tr>
            </thead>
            <tbody>
              ${scholarshipsList}
            </tbody>
          </table>
        `;
        new bootstrap.Modal(document.getElementById("scholarshipsModal")).show();
      });
      
    } else {
      console.log("No data available in the database.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
