import loadDashboard from "./components/dashboard.js";
import loadinstitutions from "./components/institutions.js";
import loadSettings from "./components/settings.js";
import loadReports from "./components/reports.js";

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
    case "institutions":
      loadinstitutions(dynamicContent);
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
