// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

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
const db = getDatabase(app);

console.log("Firebase initialized successfully");

// Dynamically load CSS
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "admissionform.css"; // Path to your CSS file
cssLink.onload = () => console.log("CSS loaded successfully");
cssLink.onerror = () => console.error("Error loading CSS file");
document.head.appendChild(cssLink);

export default function loadPlacementDetails(container) {
  // HTML content for the form
  const html = `
    <div class="container">
      <h5>Add College Placement Details</h5>
      <form id="placementDetailsForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- NAAC Grade -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="NAACGrade" class="text">NAAC Grade:</label>
              <input type="text" id="NAACGrade" class="input" placeholder="Enter NAAC Grade (if applicable) or N/A" required />
            </div>
          </div>

          <!-- Highest Package -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="highestPackage" class="text">Highest Package:</label>
              <input type="number" id="highestPackage" class="input" placeholder="Enter highest package (in LPA)" required />
            </div>
          </div>

          <!-- Average Package -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="averagePackage" class="text">Average Package:</label>
              <input type="number" id="averagePackage" class="input" placeholder="Enter average package (in LPA)" required />
            </div>
          </div>

          <!-- Placement Percentage -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="placementPercentage" class="text">Placement Percentage:</label>
              <input type="number" id="placementPercentage" class="input" placeholder="Enter placement percentage" required />
            </div>
          </div>

          <!-- Total Number of Students Eligible for Placement -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="TotalNumberofStudentsEligibleforPlacement" class="text">Total Number of Students Eligible for Placement:</label>
              <input type="number" id="TotalNumberofStudentsEligibleforPlacement" class="input" placeholder="Enter Total Number of Students Eligible for Placement" required />
            </div>
          </div>

          <!-- Number of Students Placed -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="NumberofStudentsPlaced" class="text">Number of Students Placed:</label>
              <input type="number" id="NumberofStudentsPlaced" class="input" placeholder="Enter Number of Students Placed" required />
            </div>
          </div>

          <!-- Number of Students Who Secured Internships -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="NumberofStudentsWhoSecuredInternships" class="text">Number of Students Who Secured Internships:</label>
              <input type="number" id="NumberofStudentsWhoSecuredInternships" class="input" placeholder="Enter Number of Students Who Secured Internships" required />
            </div>
          </div>

          <!-- Average Internship Stipend -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="AverageInternshipStipend" class="text">Average Internship Stipend:</label>
              <input type="text" id="AverageInternshipStipend" class="input" placeholder="Enter Average Internship Stipend" required />
            </div>
          </div>

          <!-- Top Recruiters -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="topRecruiters" class="text">Top Recruiters:</label>
              <textarea id="topRecruiters" class="input" placeholder="Enter top recruiters (comma-separated)" rows="4" required></textarea>
            </div>
          </div>

          <!-- Placement Drive Details -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="placementDriveDetails" class="text">Placement Drive Details:</label>
              <textarea id="placementDriveDetails" class="input" placeholder="Enter details of the placement drives" rows="4" required></textarea>
            </div>
          </div>

          <!-- Placement Assistance Provided -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="placementAssistance" class="text">Placement Assistance Provided:</label>
              <select id="placementAssistance" class="form-select" required>
                <option value="" disabled selected>Select Yes or No</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <!-- Name of Placement Officer -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="NameofPlacementOfficer" class="text">Name of Placement Officer:</label>
              <input type="text" id="NameofPlacementOfficer" class="input" placeholder="Enter Name of Placement Officer" required>
            </div>
          </div>

          <!-- Email ID of Placement Officer -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="EmailIDofPlacementOfficer" class="text">Email ID of Placement Officer:</label>
              <input type="email" id="EmailIDofPlacementOfficer" class="input" placeholder="Enter Email ID of Placement Officer" required>
            </div>
          </div>

          <!-- Phone Number of Placement Officer -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="PhoneNumberofPlacementOfficer" class="text">Phone Number of Placement Officer:</label>
              <input type="number" id="PhoneNumberofPlacementOfficer" class="input" placeholder="Enter Phone Number of Placement Officer" required>
            </div>
          </div>

          <!-- Upload Placement Document -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="uploadPlacementDocument" class="text">Upload Placement Document:</label>
              <input type="file" id="uploadPlacementDocument" class="input" required />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-3">
            <button type="submit" class="btn btn-primary w-5">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `;

  // Append HTML to the container
  container.innerHTML = html;

  // Form submission handler
  document.getElementById("placementDetailsForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    try {
      const formData = new FormData();
      formData.append("NAACGrade", document.getElementById("NAACGrade").value);
      formData.append("highestPackage", document.getElementById("highestPackage").value);
      formData.append("averagePackage", document.getElementById("averagePackage").value);
      formData.append("placementPercentage", document.getElementById("placementPercentage").value);
      formData.append("TotalNumberofStudentsEligibleforPlacement", document.getElementById("TotalNumberofStudentsEligibleforPlacement").value);
      formData.append("NumberofStudentsPlaced", document.getElementById("NumberofStudentsPlaced").value);
      formData.append("NumberofStudentsWhoSecuredInternships", document.getElementById("NumberofStudentsWhoSecuredInternships").value);
      formData.append("AverageInternshipStipend", document.getElementById("AverageInternshipStipend").value);
      formData.append("topRecruiters", document.getElementById("topRecruiters").value);
      formData.append("placementDriveDetails", document.getElementById("placementDriveDetails").value);
      formData.append("placementAssistance", document.getElementById("placementAssistance").value);
      formData.append("NameofPlacementOfficer", document.getElementById("NameofPlacementOfficer").value);
      formData.append("EmailIDofPlacementOfficer", document.getElementById("EmailIDofPlacementOfficer").value);
      formData.append("PhoneNumberofPlacementOfficer", document.getElementById("PhoneNumberofPlacementOfficer").value);

      const uploadPlacementDocument = document.getElementById("uploadPlacementDocument").files[0];
      if (!uploadPlacementDocument) {
        console.error("No file selected");
        alert("Please upload a document!");
        return;
      }
      formData.append("file", uploadPlacementDocument);

      // Send data to the backend
      console.log("Sending data to backend...");
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        alert("Error submitting form: " + errorData.message);
        return;
      }

      const result = await response.json();
      console.log("Backend response:", result);

      // Prompt for college name
      const collegeName = prompt("Enter the college name:");

      if (!collegeName) {
        alert("College name is required!");
        return;
      }

      // Add data to Firebase
      const placementDetailsData = {
        NAACGrade: formData.get("NAACGrade"),
        highestPackage: formData.get("highestPackage"),
        averagePackage: formData.get("averagePackage"),
        placementPercentage: formData.get("placementPercentage"),
        TotalNumberofStudentsEligibleforPlacement: formData.get("TotalNumberofStudentsEligibleforPlacement"),
        NumberofStudentsPlaced: formData.get("NumberofStudentsPlaced"),
        NumberofStudentsWhoSecuredInternships: formData.get("NumberofStudentsWhoSecuredInternships"),
        AverageInternshipStipend: formData.get("AverageInternshipStipend"),
        topRecruiters: formData.get("topRecruiters"),
        placementDriveDetails: formData.get("placementDriveDetails"),
        placementAssistance: formData.get("placementAssistance"),
        NameofPlacementOfficer: formData.get("NameofPlacementOfficer"),
        EmailIDofPlacementOfficer: formData.get("EmailIDofPlacementOfficer"),
        PhoneNumberofPlacementOfficer: formData.get("PhoneNumberofPlacementOfficer"),
        documentUrl: result.fileUrl,
      };

      console.log("Storing data in Firebase:", placementDetailsData);
      const placementNodeName = `${collegeName} Placement Details`;
      const placementRef = ref(db, "PlacementDetails/" + placementNodeName);

      await set(placementRef, placementDetailsData);
      console.log("Data stored in Firebase successfully!");

      alert("Placement details submitted successfully!");
      document.getElementById("placementDetailsForm").reset();
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred: " + error.message);
    }
  });
}
