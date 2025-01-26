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

export default function loadScholarshipForm(container) {
  const html = `
    <div class="container">
      <h5>Apply for Scholarships</h5>
      <form id="scholarshipForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- Scholarship Name -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="scholarshipName" class="text">Scholarship Name:</label>
              <input type="text" id="scholarshipName" class="input" placeholder="Enter scholarship name" required />
            </div>
          </div>

          <!-- Eligibility Criteria -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="eligibilityCriteria" class="text">Eligibility Criteria:</label>
              <textarea id="eligibilityCriteria" class="input" placeholder="Enter eligibility criteria" rows="4" required></textarea>
            </div>
          </div>

          <!-- Application Deadline -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="applicationDeadline" class="text">Application Deadline:</label>
              <input type="date" id="applicationDeadline" class="input" required />
            </div>
          </div>

          <!-- Scholarship Amount -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="scholarshipAmount" class="text">Scholarship Amount:</label>
              <input type="number" id="scholarshipAmount" class="input" placeholder="Enter scholarship amount" required />
            </div>
          </div>

          <!-- Required Documents -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="requiredDocuments" class="text">Required Documents:</label>
              <textarea id="requiredDocuments" class="input" placeholder="List required documents" rows="4" required></textarea>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="contactInformation" class="text">Contact Information:</label>
              <textarea id="contactInformation" class="input" placeholder="Enter contact information" rows="4" required></textarea>
            </div>
          </div>

          <!-- Additional Notes -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="additionalNotes" class="text">Additional Notes:</label>
              <textarea id="additionalNotes" class="input" placeholder="Enter additional notes (if any)" rows="4"></textarea>
            </div>
          </div>

          <!-- Upload Supporting Documents -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="uploadSupportingDocuments" class="text">Upload Supporting Documents:</label>
              <input type="file" id="uploadSupportingDocuments" class="input" required />
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
  document.getElementById("scholarshipForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    const formData = new FormData();
    formData.append("scholarshipName", document.getElementById("scholarshipName").value);
    formData.append("eligibilityCriteria", document.getElementById("eligibilityCriteria").value);
    formData.append("applicationDeadline", document.getElementById("applicationDeadline").value);
    formData.append("scholarshipAmount", document.getElementById("scholarshipAmount").value);
    formData.append("requiredDocuments", document.getElementById("requiredDocuments").value);
    formData.append("contactInformation", document.getElementById("contactInformation").value);
    formData.append("additionalNotes", document.getElementById("additionalNotes").value);

    const uploadSupportingDocuments = document.getElementById("uploadSupportingDocuments").files[0];
    if (!uploadSupportingDocuments) {
      console.error("No file selected");
      return alert("Please upload supporting documents!");
    }
    formData.append("file", uploadSupportingDocuments);

    try {
      console.log("Sending data to backend...");
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (response.ok) {
        console.log("Document uploaded successfully:", result.fileUrl);

        // Prompt the user for scholarship name
        const scholarshipTitle = prompt("Enter the scholarship title:");

        if (!scholarshipTitle) {
          alert("Scholarship title is required!");
          return;
        }

        // Add data to Firebase
        const scholarshipData = {
          scholarshipName: formData.get("scholarshipName"),
          eligibilityCriteria: formData.get("eligibilityCriteria"),
          applicationDeadline: formData.get("applicationDeadline"),
          scholarshipAmount: formData.get("scholarshipAmount"),
          requiredDocuments: formData.get("requiredDocuments"),
          contactInformation: formData.get("contactInformation"),
          additionalNotes: formData.get("additionalNotes"),
          documentUrl: result.fileUrl,
        };

        console.log("Storing data in Firebase:", scholarshipData);
        const scholarshipNodeName = `${scholarshipTitle} Details`;
        const scholarshipRef = ref(db, "ScholarshipDetails/" + scholarshipNodeName);

        await set(scholarshipRef, scholarshipData);
        console.log("Data stored in Firebase successfully!");

        alert("Scholarship form submitted successfully!");
        document.getElementById("scholarshipForm").reset();
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
