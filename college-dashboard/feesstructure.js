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

export default function loadFeesStructure(container) {
  const html = `
    <div class="container">
      <h5>Add College Fee Structure</h5>
      <form id="feeStructureForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- Tuition Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="tuitionFees" class="text">Tuition Fees:</label>
              <input type="number" id="tuitionFees" class="input" placeholder="Enter tuition fees" required />
            </div>
          </div>

          <!-- Hostel Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="hostelFees" class="text">Hostel Fees (if applicable):</label>
              <input type="number" id="hostelFees" class="input" placeholder="Enter hostel fees" required />
            </div>
          </div>

          <!-- Mess Charges -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="messCharges" class="text">Mess Charges:</label>
              <input type="number" id="messCharges" class="input" placeholder="Enter mess charges" required />
            </div>
          </div>

          <!-- Admission Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="admissionFees" class="text">Admission Fees:</label>
              <input type="number" id="admissionFees" class="input" placeholder="Enter admission fees" required />
            </div>
          </div>

          <!-- Examination Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="examinationFees" class="text">Examination Fees:</label>
              <input type="number" id="examinationFees" class="input" placeholder="Enter examination fees" required />
            </div>
          </div>

          <!-- Library Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="libraryFees" class="text">Library Fees:</label>
              <input type="number" id="libraryFees" class="input" placeholder="Enter library fees" required />
            </div>
          </div>

          <!-- Lab Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="labFees" class="text">Lab Fees (if applicable):</label>
              <input type="number" id="labFees" class="input" placeholder="Enter lab fees" required />
            </div>
          </div>

          <!-- Miscellaneous Fees -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="miscellaneousFees" class="text">Miscellaneous Fees:</label>
              <input type="number" id="miscellaneousFees" class="input" placeholder="Enter miscellaneous fees" required />
            </div>
          </div>

          

          <!-- Payment Schedule -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="paymentSchedule" class="text">Payment Schedule:</label>
              <textarea id="paymentSchedule" class="input" placeholder="Enter payment schedule" rows="4" required></textarea>
            </div>
          </div>

          <!-- Scholarship Options Available -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="scholarshipOptionsAvailable" class="text">Scholarship Options Available:</label>
              <textarea id="scholarshipOptionsAvailable" class="input" placeholder="Enter Scholarship Options Available" rows="4" required></textarea>
            </div>
          </div>

          
          <!-- Payment Modes Accepted -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="paymentModesAccepted" class="text">Payment Modes Accepted:</label>
              <textarea id="paymentModesAccepted" class="input" placeholder="Enter Payment Modes Accepted" rows="4" required></textarea>
            </div>
          </div>

          <!-- Late Fee Penalty (if any)  -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="lateFeePenalty" class="text">Late Fee Penalty (if any):</label>
              <textarea id="lateFeePenalty" class="input" placeholder="Enter Late Fee Penalty (if any)" rows="4" required></textarea>
            </div>
          </div>

          <!-- Contact for Fee Queries (Email/Phone) -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="ContactforFeeQueries" class="text">Contact for Fee Queries (Email/Phone):</label>
              <textarea id="ContactforFeeQueries" class="input" placeholder="Enter Contact for Fee Queries (Email/Phone):" rows="4" required></textarea>
            </div>
          </div>



          <!-- Additional Notes (if any) -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="AdditionalNotes" class="text">Additional Notes (if any):</label>
              <textarea id="AdditionalNotes" class="input" placeholder="Additional Notes (if any):" rows="4" required></textarea>
            </div>
          </div>


          <!-- Upload Document -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="uploadFeeDocument" class="text">Upload Document:</label>
              <input type="file" id="uploadFeeDocument" class="input" required />
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
  document.getElementById("feeStructureForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    const formData = new FormData();
    formData.append("tuitionFees", document.getElementById("tuitionFees").value);
    formData.append("hostelFees", document.getElementById("hostelFees").value);
    formData.append("messCharges", document.getElementById("messCharges").value);
    formData.append("admissionFees", document.getElementById("admissionFees").value);
    formData.append("examinationFees", document.getElementById("examinationFees").value);
    formData.append("libraryFees", document.getElementById("libraryFees").value);
    formData.append("labFees", document.getElementById("labFees").value);
    formData.append("miscellaneousFees", document.getElementById("miscellaneousFees").value);
    formData.append("paymentSchedule", document.getElementById("paymentSchedule").value);
    formData.append("scholarshipOptionsAvailable", document.getElementById("scholarshipOptionsAvailable").value);
    formData.append("paymentModesAccepted", document.getElementById("paymentModesAccepted").value);
    formData.append("lateFeePenalty", document.getElementById("lateFeePenalty").value);
    formData.append("ContactforFeeQueries", document.getElementById("ContactforFeeQueries").value);
    formData.append("AdditionalNotes", document.getElementById("AdditionalNotes").value);

    const uploadFeeDocument = document.getElementById("uploadFeeDocument").files[0];
    if (!uploadFeeDocument) {
      console.error("No file selected");
      return alert("Please upload a document!");
    }
    formData.append("file", uploadFeeDocument);

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

        // Prompt the user for college name
        const collegeName = prompt("Enter the college name:");

        if (!collegeName) {
          alert("College name is required!");
          return;
        }

        // Add data to Firebase
        const feeStructureData = {
          tuitionFees: formData.get("tuitionFees"),
          hostelFees: formData.get("hostelFees"),
          messCharges: formData.get("messCharges"),
          admissionFees: formData.get("admissionFees"),
          examinationFees: formData.get("examinationFees"),
          libraryFees: formData.get("libraryFees"),
          labFees: formData.get("labFees"),
          miscellaneousFees: formData.get("miscellaneousFees"),
          paymentSchedule: formData.get("paymentSchedule"),
          scholarshipOptionsAvailable: formData.get("scholarshipOptionsAvailable"),
          paymentModesAccepted: formData.get("paymentModesAccepted"),
          lateFeePenalty: formData.get("lateFeePenalty"),
          ContactforFeeQueries: formData.get("ContactforFeeQueries"),
          AdditionalNotes: formData.get("AdditionalNotes"),
          documentUrl: result.fileUrl,
        };

        console.log("Storing data in Firebase:", feeStructureData);
        const feeNodeName = `${collegeName} Fees Structure`;
        const feeRef = ref(db, "FeeDetails/" + feeNodeName);

        await set(feeRef, feeStructureData);
        console.log("Data stored in Firebase successfully!");

        alert("Fee structure submitted successfully!");
        document.getElementById("feeStructureForm").reset();
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