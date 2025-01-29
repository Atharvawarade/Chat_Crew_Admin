// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
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

document.addEventListener("DOMContentLoaded", function () {
  // Get collegeName from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const collegeName = urlParams.get("collegeName");
  const container = document.getElementById("profileContainer");

  if (!collegeName) {
    console.error("Error: No college name found in URL parameters.");
    alert("Invalid access. Redirecting to login.");
    window.location.href = "../Auth/college-login.html";
    return;
  }

  if (!container) {
    console.error("Error: Profile container not found in the DOM.");
    return;
  }

  console.log("College Name from URL:", collegeName);
  loadProfileForm(container, collegeName);
});

export default function loadProfileForm(container, collegeName) {
  const html = `
    <div class="container">
    <h5>Edit College Profile</h5>
    <form id="profileForm">
        
        <!-- General Information -->
        <div class="card mb-3">
            <div class="card-header">General Information</div>
            <div class="card-body row g-3">
                <div class="col-md-12">
                    <label>College Name:</label>
                    <input type="text" id="collegeName" class="form-control" value="${collegeName}" readonly disabled/>
                </div>
                <div class="col-md-6">
                    <label for="logo">Logo:</label>
                    <input type="file" id="logo" class="form-control" accept="image/*"/>
                </div>

                <div class="col-md-6">
                    <img id="logoPreview" src="" alt="College Logo" style="display: none; max-width: 50px; max-height: 50px; margin-top: 4%; align-self:center;">
                </div>

                <div class="col-md-12">
                    <label>Tagline/Motto:</label>
                    <input type="text" id="tagline" class="form-control" required />
                </div>
            </div>
        </div>

        <!-- Contact Information -->
        <div class="card mb-3">
            <div class="card-header">Contact Information</div>
            <div class="card-body row g-3">
                <div class="col-md-12">
                    <label>Address:</label>
                    <input type="text" id="address" class="form-control" required />
                </div>
                <div class="col-md-6">
                    <label>Phone Number:</label>
                    <input type="tel" id="phoneNumber" class="form-control" required />
                </div>
                <div class="col-md-6">
                    <label>Email:</label>
                    <input type="email" id="email" class="form-control" required />
                </div>
                <div class="col-md-12">
                    <label>Website:</label>
                    <input type="url" id="website" class="form-control" required />
                </div>
            </div>
        </div>

        <!-- About College -->
        <div class="card mb-3">
            <div class="card-header">About College</div>
            <div class="card-body row g-3">
                <div class="col-md-12">
                    <label>About:</label>
                    <textarea id="about" class="form-control" rows="3" required></textarea>
                </div>
                <div class="col-md-12">
                    <label>Map/Location:</label>
                    <input type="url" id="map" class="form-control" placeholder="Google Map Embed URL" />
                </div>
            </div>
        </div>

        <!-- Academic Details -->
        <div class="card mb-3">
            <div class="card-header">Academic Details</div>
            <div class="card-body row g-3">
                <div class="col-md-6">
                    <label>Courses Offered:</label>
                    <textarea id="courses" class="form-control" rows="2" required></textarea>
                </div>
                <div class="col-md-6">
                    <label>Departments:</label>
                    <textarea id="departments" class="form-control" rows="2" required></textarea>
                </div>

                <div class="col-md-6">
                    <label>Affiliations:</label>
                    <input type="text" id="affiliations" class="form-control mb-2" required />
                </div>
 
                <div class="col-md-6">
                    <label>Accreditations:</label>
                    <input type="text" id="accreditations" class="form-control" required />
                </div>
            </div>
        </div>

        <!-- Social Media -->
        <div class="card mb-3">
            <div class="card-header">Social Media</div>
            <div class="card-body row g-3">
                <div class="col-md-4">
                    <label>Facebook:</label>
                    <input type="url" id="facebook" class="form-control" />
                </div>
                <div class="col-md-4">
                    <label>LinkedIn:</label>
                    <input type="url" id="linkedin" class="form-control" />
                </div>
                <div class="col-md-4">
                    <label>Twitter:</label>
                    <input type="url" id="twitter" class="form-control" />  
                </div>
            </div>
        </div>

        <!-- Media Uploads -->
        <div class="card mb-3">
            <div class="card-header">Media Uploads</div>
            <div class="card-body row g-3">
                <div class="col-md-6">
                    <label>Image Slideshow:</label>
                    <input type="file" id="galleryImages" class="form-control" multiple accept="image/*" />
                </div>
                <div class="col-md-6">
                    <label>Video:</label>
                    <input type="file" id="promoVideo" class="form-control" accept="video/*" />
                </div>
            </div>
        </div>

        <!-- Submit Button -->
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Save Profile</button>
            </div>

    </form>
</div>

  `;

  container.innerHTML = html;

  // Reference to Firebase database for this college
  const profileRef = ref(db, `CollegesData/${collegeName}`);

  // Fetch existing profile data
  get(profileRef).then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("tagline").value = data.tagline || "";
        document.getElementById("about").value = data.about || "";
        document.getElementById("address").value = data.address || "";
        document.getElementById("phoneNumber").value = data.phoneNumber || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("website").value = data.website || "";
        document.getElementById("map").value = data.map || "";
        document.getElementById("courses").value = data.courses || "";
        document.getElementById("departments").value = data.departments || "";
        document.getElementById("affiliations").value = data.affiliations || "";
        document.getElementById("accreditations").value = data.accreditations || "";
        document.getElementById("facebook").value = data.facebook || "";
        document.getElementById("linkedin").value = data.linkedin || "";
        document.getElementById("twitter").value = data.twitter || "";

        if (data.logoUrl) {
            document.getElementById("logoPreview").src = data.logoUrl;
            document.getElementById("logoPreview").style.display = "block";
        }
    }
});

  
  // Save updated profile data to Firebase
  document.getElementById("profileForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get selected logo file
    const logoFile = document.getElementById("logo").files[0];

    // Get selected gallery images (can be multiple)
    const galleryFiles = document.getElementById("galleryImages").files;
    let uploadedImageUrls = [];

    // Function to upload a file and return the file URL
    async function uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log(`Uploading file: ${file.name}...`);
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Backend response:", result);

            if (response.ok) {
                return result.fileUrl;
            } else {
                console.error("Failed to upload file:", result);
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    }

    // Upload the logo and store the URL
    let logoUrl = "";
    if (logoFile) {
        logoUrl = await uploadFile(logoFile);
    }

    // Upload multiple gallery images and store their URLs
    for (const file of galleryFiles) {
        const imageUrl = await uploadFile(file);
        if (imageUrl) {
            uploadedImageUrls.push(imageUrl);
        }
    }

    // Fetch existing image slideshow URLs (to append new ones)
    const imageSlideshowRef = ref(db, `CollegesData/${collegeName}/ImageSlideshow`);
    const snapshot = await get(imageSlideshowRef);
    let existingImages = snapshot.exists() ? snapshot.val() : [];

    // Merge new images with existing ones
    const updatedImages = [...existingImages, ...uploadedImageUrls];

    // Prepare profile data
    const profileData = {
        tagline: document.getElementById("tagline").value,
        about: document.getElementById("about").value,
        address: document.getElementById("address").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        website: document.getElementById("website").value,
        map: document.getElementById("map").value,
        courses: document.getElementById("courses").value,
        departments: document.getElementById("departments").value,
        affiliations: document.getElementById("affiliations").value,
        accreditations: document.getElementById("accreditations").value,
        facebook: document.getElementById("facebook").value,
        linkedin: document.getElementById("linkedin").value,
        twitter: document.getElementById("twitter").value,
        logoUrl: logoUrl || "", // Store the uploaded logo URL
        ImageSlideshow: updatedImages, // Store updated image slideshow URLs
    };

    // Save profile data to Firebase
    await set(ref(db, `CollegesData/${collegeName}`), profileData);
    alert("Profile updated successfully with logo and images!");
});


}