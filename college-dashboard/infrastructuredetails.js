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

export default function loadInfrastructureDetails(container) {
  // HTML content for the form
  const html = `
    <div class="container">
      <h5>Add College Infrastructure Details</h5>
      <form id="infrastructureDetailsForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- Total Campus Area -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="campusArea" class="text">Total Campus Area (in acres):</label>
              <input type="number" id="campusArea" class="input" placeholder="Enter campus area in acres" required />
            </div>
          </div>

          <!-- Number of Academic Buildings -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="academicBuildings" class="text">Number of Academic Buildings:</label>
              <input type="number" id="academicBuildings" class="input" placeholder="Enter number of academic buildings" required />
            </div>
          </div>

          <!-- Number of Laboratories -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="laboratories" class="text">Number of Laboratories:</label>
              <input type="number" id="laboratories" class="input" placeholder="Enter number of laboratories" required />
            </div>
          </div>

          <!-- Library Details -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="libraryDetails" class="text">Library Details:</label>
              <textarea id="libraryDetails" class="input" placeholder="Describe the library resources" rows="4" required></textarea>
            </div>
          </div>

          <!-- Hostel Capacity (Boys) -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="hostelBoys" class="text">Hostel Capacity (Boys):</label>
              <input type="number" id="hostelBoys" class="input" placeholder="Enter boys' hostel capacity" required />
            </div>
          </div>

          <!-- Hostel Capacity (Girls) -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="hostelGirls" class="text">Hostel Capacity (Girls):</label>
              <input type="number" id="hostelGirls" class="input" placeholder="Enter girls' hostel capacity" required />
            </div>
          </div>

          <div class="col-md-6">
            <div class="coolinput">
                <label for="hostelAmenities" class="text">Hostel Amenities:</label>
                <div id="hostelAmenities" class="input d-flex flex-wrap">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="wifiAvailability" value="Wi-Fi Availability">
                    <label class="form-check-label" for="wifiAvailability">Wi-Fi Availability</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="messFacilities" value="Mess and Dining Facilities">
                    <label class="form-check-label" for="messFacilities">Mess and Dining Facilities</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="laundryServices" value="Laundry Services">
                    <label class="form-check-label" for="laundryServices">Laundry Services</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="securityProvisions" value="Security Provisions (e.g., CCTV, Wardens)">
                    <label class="form-check-label" for="securityProvisions">Security Provisions (e.g., CCTV, Wardens)</label>
                </div>
                </div>
            </div>
          </div>




          <!-- Sports Infrastructure -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="sportsInfrastructure" class="text">Sports Infrastructure:</label>
              <textarea id="sportsInfrastructure" class="input" placeholder="Describe sports facilities (indoor/outdoor)" rows="4" required></textarea>
            </div>
          </div>

          <!-- IT Infrastructure and Wi-Fi -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="itInfrastructure" class="text">IT Infrastructure and Wi-Fi:</label>
              <textarea id="itInfrastructure" class="input" placeholder="Describe IT and Wi-Fi facilities" rows="4" required></textarea>
            </div>
          </div>

          <!-- Auditorium and Conference Halls -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="auditoriumDetails" class="text">Auditorium and Conference Halls:</label>
              <textarea id="auditoriumDetails" class="input" placeholder="Describe auditorium and hall details" rows="4" required></textarea>
            </div>
          </div>

          <!-- Upload Infrastructure Document -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="uploadInfrastructureDocument" class="text">Upload Infrastructure Document:</label>
              <input type="file" id="uploadInfrastructureDocument" class="input" required />
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
  document.getElementById("infrastructureDetailsForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    try {
      const formData = new FormData();
      formData.append("campusArea", document.getElementById("campusArea").value);
      formData.append("academicBuildings", document.getElementById("academicBuildings").value);
      formData.append("laboratories", document.getElementById("laboratories").value);
      formData.append("libraryDetails", document.getElementById("libraryDetails").value);
      formData.append("hostelBoys", document.getElementById("hostelBoys").value);
      formData.append("hostelGirls", document.getElementById("hostelGirls").value);
      formData.append("hostelAmenities", document.getElementById("hostelAmenities").value);
      formData.append("sportsInfrastructure", document.getElementById("sportsInfrastructure").value);
      formData.append("itInfrastructure", document.getElementById("itInfrastructure").value);
      formData.append("auditoriumDetails", document.getElementById("auditoriumDetails").value);

      const uploadInfrastructureDocument = document.getElementById("uploadInfrastructureDocument").files[0];
      if (!uploadInfrastructureDocument) {
        console.error("No file selected");
        alert("Please upload a document!");
        return;
      }
      formData.append("file", uploadInfrastructureDocument);

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
      const infrastructureData = {
        campusArea: formData.get("campusArea"),
        academicBuildings: formData.get("academicBuildings"),
        laboratories: formData.get("laboratories"),
        libraryDetails: formData.get("libraryDetails"),
        hostelBoys: formData.get("hostelBoys"),
        hostelGirls: formData.get("hostelGirls"),
        hostelAmenities: formData.get("hostelAmenities"),
        sportsInfrastructure: formData.get("sportsInfrastructure"),
        itInfrastructure: formData.get("itInfrastructure"),
        auditoriumDetails: formData.get("auditoriumDetails"),
        documentUrl: result.fileUrl,
      };

      console.log("Storing data in Firebase:", infrastructureData);
      const infraNodeName = `${collegeName} Infrastructure Details`;
      const infraRef = ref(db, "InfrastructureDetails/" + infraNodeName);

      await set(infraRef, infrastructureData);
      console.log("Data stored in Firebase successfully!");

      alert("Infrastructure details submitted successfully!");
      document.getElementById("infrastructureDetailsForm").reset();
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred: " + error.message);
    }
  });
}
