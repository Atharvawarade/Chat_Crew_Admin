import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
  authDomain: "student-assistance-chatbot.firebaseapp.com",
  databaseURL:
    "https://student-assistance-chatbot-default-rtdb.firebaseio.com/",
  projectId: "student-assistance-chatbot",
  storageBucket: "student-assistance-chatbot.appspot.com",
  messagingSenderId: "580188102556",
  appId: "1:580188102556:web:f3b221ec0222495786b259",
  measurementId: "G-1D5NCR4SFK",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function loadDashboard(container) {
  const html = `
    <h1 style="text-align: center; margin-bottom: 20px;">Database Summary</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">Main Nodes</div>
            <div class="card-body">
              <h5 class="card-title" id="mainNodes">0</h5>
              <p class="card-text">Total number of main nodes in the database.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">Inner Nodes</div>
            <div class="card-body">
              <h5 class="card-title" id="innerNodes">0</h5>
              <p class="card-text">Total number of inner nodes under all main nodes.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-white bg-danger mb-3">
            <div class="card-header">Keys</div>
            <div class="card-body">
              <h5 class="card-title" id="keysCount">0</h5>
              <p class="card-text">Total number of keys in the database.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  container.innerHTML = html;

  try {
    // Fetch all data from the database
    const dbRef = ref(db);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      let mainNodes = 0;
      let innerNodes = 0;
      let keysCount = 0;

      // Traverse through the data to calculate statistics
      Object.entries(data).forEach(([mainKey, mainValue]) => {
        mainNodes++;
        if (typeof mainValue === "object" && mainValue !== null) {
          innerNodes += Object.keys(mainValue).length;
          keysCount += Object.entries(mainValue).reduce(
            (count, [, innerValue]) =>
              count + (typeof innerValue === "object" ? Object.keys(innerValue).length : 1),
            0
          );
        } else {
          keysCount++;
        }
      });

      // Update card values
      document.getElementById("mainNodes").innerText = mainNodes;
      document.getElementById("innerNodes").innerText = innerNodes;
      document.getElementById("keysCount").innerText = keysCount;
    } else {
      console.log("No data available in the database.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
