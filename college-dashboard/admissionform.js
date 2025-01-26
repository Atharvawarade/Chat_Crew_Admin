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
document.head.appendChild(cssLink);

export default function loadAdmissionForm(container) {
  const html = `
    
    <div class="container">
    <h5>Add College Admission Data</h5>
      <form id="admissionForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- Institution Name -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="institutionName" class="text">Institution Name:</label>
              <input type="text" placeholder="Enter institution name" id="institutionName" class="input" required />
            </div>
          </div>

          <!-- Admission Start and End Dates -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="admissionStartDate" class="text">Admission Start Date:</label>
              <input type="date" id="admissionStartDate" class="input" required />
            </div>
          </div>
          <div class="col-md-6">
            <div class="coolinput">
              <label for="admissionEndDate" class="text">Admission End Date:</label>
              <input type="date" id="admissionEndDate" class="input" required />
            </div>
          </div>

          <!-- Eligibility Criteria -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="eligibilityCriteria" class="text">Eligibility Criteria:</label>
              <textarea id="eligibilityCriteria" class="input" placeholder="Enter eligibility criteria" rows="4" required></textarea>
            </div>
          </div>

          <!-- Admission Procedure -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="admissionProcedure" class="text">Admission Procedure:</label>
              <textarea id="admissionProcedure" class="input" placeholder="Enter admission procedure" rows="4" required></textarea>
            </div>
          </div>

          <!-- Documents Required -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="documentsRequired" class="text">Documents Required:</label>
              <textarea id="documentsRequired" class="input" placeholder="List the required documents" rows="4" required></textarea>
            </div>
          </div>

          <!-- Application Fee -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="applicationFee" class="text">Application Fee:</label>
              <input type="number" id="applicationFee" class="input" placeholder="Enter application fee" required />
            </div>
          </div>

          <!-- Contact Details -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="contactDetails" class="text">Contact Details:</label>
              <textarea id="contactDetails" class="input" placeholder="Enter contact details" rows="3" required></textarea>
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="additionalNotes" class="text">Additional Notes:</label>
              <textarea id="additionalNotes" class="input" placeholder="Add any additional notes" rows="4"></textarea>
            </div>
          </div>

          <!-- File Upload Field -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="uploadDocument" class="text">Upload Document:</label>
              <input type="file" id="uploadDocument" class="input" required />
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

  container.innerHTML = html;

  // Form submission handler
  document.getElementById("admissionForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    const formData = new FormData();
    formData.append("institutionName", document.getElementById("institutionName").value);
    formData.append("admissionStartDate", document.getElementById("admissionStartDate").value);
    formData.append("admissionEndDate", document.getElementById("admissionEndDate").value);
    formData.append("eligibilityCriteria", document.getElementById("eligibilityCriteria").value);
    formData.append("admissionProcedure", document.getElementById("admissionProcedure").value);
    formData.append("documentsRequired", document.getElementById("documentsRequired").value);
    formData.append("applicationFee", document.getElementById("applicationFee").value);
    formData.append("contactDetails", document.getElementById("contactDetails").value);
    formData.append("additionalNotes", document.getElementById("additionalNotes").value);

    const uploadDocument = document.getElementById("uploadDocument").files[0];
    if (uploadDocument) {
      console.log("File selected:", uploadDocument.name);
      formData.append("file", uploadDocument);
    } else {
      console.error("No file selected");
      return alert("Please upload a document!");
    }

    try {
      console.log("Sending data to backend...");
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (response.ok) {
        console.log("Image uploaded successfully:", result.fileUrl);

        // Add data to Firebase
        const admissionData = {
          institutionName: formData.get("institutionName"),
          admissionStartDate: formData.get("admissionStartDate"),
          admissionEndDate: formData.get("admissionEndDate"),
          eligibilityCriteria: formData.get("eligibilityCriteria"),
          admissionProcedure: formData.get("admissionProcedure"),
          documentsRequired: formData.get("documentsRequired"),
          applicationFee: formData.get("applicationFee"),
          contactDetails: formData.get("contactDetails"),
          additionalNotes: formData.get("additionalNotes"),
          documentUrl: result.fileUrl, // File URL from backend
        };

        console.log("Storing data in Firebase:", admissionData);
        const collegeNodeName = `${admissionData.institutionName} Admission Data`;
        const collegeRef = ref(db, "AdmissionDetails/" + collegeNodeName);

        await set(collegeRef, admissionData);
        console.log("Data stored in Firebase succesfully!");

        alert("Form submitted successfully!");
        document.getElementById("admissionForm").reset();
      } else {
        console.error("Backend error:", result.message);
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Network or Firebase error:", error);
      alert("Network error. Please try again.");
    }
  });
}