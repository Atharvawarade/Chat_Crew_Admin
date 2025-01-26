// Import additional components
import loadDashboard from "./components/dashboard.js";
import loadAdmissionForm from "./components/admissionform.js";
import loadSettings from "./components/settings.js";
import loadReports from "./components/reports.js";
import loadFeesStructure from "./components/feesstructure.js";
import loadScholarshipDetails from "./components/scholarshipdetails.js";
import loadPlacementDetails from "./components/placementdetails.js";
import loadCurriculumDetails from "./components/curriculumdetails.js";
import loadInfrastructureDetails from "./components/infrastructuredetails.js";

const sidebarLinks = document.querySelectorAll("#sidebar a");
const dynamicContent = document.getElementById("dynamicContent");

// Function to set active link
function setActiveLink(activeLink) {
  sidebarLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

// Function to load the respective component
function loadPage(page, link) {
  dynamicContent.innerHTML = ""; // Clear existing content
  setActiveLink(link); // Highlight the active sidebar link
  switch (page) {
    case "dashboard":
      loadDashboard(dynamicContent);
      break;
    case "admissionform":
      loadAdmissionForm(dynamicContent);
      break;
    case "feesstructure":
      loadFeesStructure(dynamicContent);
      break;
    case "scholarshipdetails":
      loadScholarshipDetails(dynamicContent);
      break;
    case "placementdetails":
      loadPlacementDetails(dynamicContent);
      break;
    case "curriculumdetails":
      loadCurriculumDetails(dynamicContent);
      break;
    case "infrastructuredetails":
      loadInfrastructureDetails(dynamicContent);
      break;
    case "settings":
      loadSettings(dynamicContent);
      break;
    case "reports":
      loadReports(dynamicContent);
      break;
    default:
      dynamicContent.innerHTML = "<h1>Page not found</h1>";
  }
}

// Set up navigation
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page").replace(".js", ""); // Extract page name
    loadPage(page, link);
  });
});

// Load default page
const defaultPage = "dashboard";
const defaultLink = document.querySelector(`[data-page="${defaultPage}.js"]`);
loadPage(defaultPage, defaultLink);
