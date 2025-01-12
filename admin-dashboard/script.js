import loadDashboard from "./components/dashboard.js";

const sidebarLinks = document.querySelectorAll("#sidebar a");
const dynamicContent = document.getElementById("dynamicContent");

// Function to set active link
function setActiveLink(activeLink) {
  sidebarLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

// Function to load the respective component
function loadPage(page) {
  dynamicContent.innerHTML = ""; // Clear existing content
  switch (page) {
    case "dashboard":
      loadDashboard(dynamicContent);
      break;
    case "users":
      loadUsers(dynamicContent);
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
    const page = link.getAttribute("data-page");
    setActiveLink(link);
    loadPage(page);
  });
});

// Load default page
loadPage("dashboard");
