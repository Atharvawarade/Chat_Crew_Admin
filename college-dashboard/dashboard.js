import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

// Firebase Configuration
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

// Inject CSS
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "dashboard.css";
document.head.appendChild(cssLink);

export default async function loadDashboard(container) {
  const collegeName = sessionStorage.getItem("collegeName");

  if (!collegeName) {
    container.innerHTML = `<p class="text-center text-danger">No college name found in session.</p>`;
    return;
  }

  const snapshot = await get(ref(db, `CollegesData/${collegeName}`));
  if (!snapshot.exists()) {
    container.innerHTML = `<p class="text-center text-danger">No college data found for ${collegeName}.</p>`;
    return;
  }

  const data = snapshot.val();

  const html = `
    <div class="container mt-2 mb-2">  
      <div class="row">
        <div class="col-md-8">
          <div class="row align-items-center mb-10">
            <div class="col-10">
              <h2>${collegeName}</h2>
            </div>
            <div class="col-2 logo-container">
              ${data.logoUrl ? `<img src="${data.logoUrl}" class="img-fluid" alt="${collegeName} Logo">` : ""}
            </div>
          </div>
          <p><strong>Tagline:</strong> ${data.tagline || "N/A"}</p>
          <p><strong>About:</strong> ${data.about || "N/A"}</p>
          <p><strong>Accreditations:</strong> ${data.accreditations || "N/A"}</p>
          <p><strong>Affiliations:</strong> ${data.affiliations || "N/A"}</p>
          <p><strong>Address:</strong> ${data.address || "N/A"}</p>
          <p><strong>Phone:</strong> ${data.phoneNumber || "N/A"}</p>
          <p><strong>Email:</strong> ${data.email || "N/A"}</p>
          <p><strong>Website:</strong> <a href="${data.website || "#"}" target="_blank">${data.website || "N/A"}</a></p>
          <p><strong>Courses:</strong> ${data.courses || "N/A"}</p>
          <p><strong>Departments:</strong> ${data.departments || "N/A"}</p>
          <p><strong>Social Media:</strong> 
            ${data.facebook ? `<a href="${data.facebook}" target="_blank">Facebook</a> | ` : ""}
            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a> | ` : ""}
            ${data.twitter ? `<a href="${data.twitter}" target="_blank">Twitter</a>` : ""}
          </p>
        </div>
        <div class="col-md-4">
          <div id="slideshow" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${data.ImageSlideshow ? data.ImageSlideshow.map((img, index) => `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                  <img src="${img}" class="d-block w-100" style="height: 200px; object-fit: cover;" alt="Slide ${index + 1}">
                </div>`).join("") : `<p>No images available.</p>`}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#slideshow" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#slideshow" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>
          </div>
          <h4 class="mt-3">Location Map</h4>
          ${data.map ? `<iframe src="${data.map}" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>` : `<p>No map available.</p>`}

          <h4 class="mt-3">Promotional Video</h4>
          ${data.video ? `<iframe width="100%" height="250" src="${data.video}" frameborder="0" allowfullscreen></iframe>` : `<p>No video available.</p>`}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}
