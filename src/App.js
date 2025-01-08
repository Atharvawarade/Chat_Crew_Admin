import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import UploadForm from "./components/UploadForm/UploadForm";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LandingPage from "./components/LandingPage/LandingPage";
import DTEList from "./components/DTEList/DTEList";
import axios from "axios"; // Import axios to handle HTTP requests
import "./App.css";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(null);
  const [collegeName, setCollegeName] = useState("");
  const [view, setView] = useState("landing"); // Tracks the current view
  const [isRegistering, setIsRegistering] = useState(false); // To track whether to show Register view
  const [isDashboardActive, setIsDashboardActive] = useState(true); // Controls which tab is active
  const [uploadedData, setUploadedData] = useState([]); // State to hold the uploaded data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, "CollegesData"), where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCollegeName(doc.data().collegeName);
        });
      } else {
        setCollegeName("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch uploaded data from Firebase when the "Uploaded Data" tab is clicked
  useEffect(() => {
    if (!isDashboardActive) {
      const fetchUploadedData = async () => {
        const q = query(collection(db, "UploadedData"));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setUploadedData(data);
      };
      fetchUploadedData();
    }
  }, [isDashboardActive]);

  const handleRegisterSuccess = (college) => {
    setCollegeName(college);
    setView("dte");
  };

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleReturn = () => {
    setSelectedCard(null);
  };

  const handleTabClick = (tab) => {
    if (tab === "dashboard") {
      setIsDashboardActive(true);
    } else if (tab === "uploadedData") {
      setIsDashboardActive(false);
    }
  };

  // Handle file upload and send to the backend
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Make the request to the backend to handle the file
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // Handle response (if needed)
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please upload a valid PDF or Excel file.");
    }
  };

  return (
    <div className="app-container">
      {view === "landing" ? (
        <LandingPage
          onSelect={(option) => {
            if (option === "DTE") {
              setView("dte");
            } else {
              setView("auth"); 
            }
          }}
        />
      ) : view === "dte" ? (
        <>
          <Sidebar isCollapsed={isCollapsed} onToggle={handleSidebarToggle} onLogout={() => signOut(auth)} />
          <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
            <Navbar isDashboardActive={isDashboardActive} onTabClick={handleTabClick} />
            {isDashboardActive ? (
              <div className="content-container">
                <h4>Welcome to the DTE Dashboard</h4>
                {/* Other DTE content can go here */}
              </div>
            ) : (
              <div className="content-container">
                <h4>Uploaded Data</h4>
                <ul>
                  {uploadedData.length > 0 ? (
                    uploadedData.map((data, index) => (
                      <li key={index}>
                        <p>{data.fileName}</p>
                        <p>{data.timestamp?.toDate().toString()}</p>
                      </li>
                    ))
                  ) : (
                    <p>No data uploaded yet.</p>
                  )}
                </ul>
              </div>
            )}
            <div className="file-upload-container">
              <input type="file" onChange={handleFileUpload} />
              <button className="btn btn-primary" onClick={() => document.querySelector("input[type='file']").click()}>
                Upload File
              </button>
            </div>
          </div>
        </>
      ) : isRegistering ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      ) : user ? (
        <>
          <Sidebar isCollapsed={isCollapsed} onToggle={handleSidebarToggle} onLogout={() => signOut(auth)} />
          <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
            <Navbar isDashboardActive={isDashboardActive} onTabClick={handleTabClick} />
            {isDashboardActive ? (
              <div className="content-container">
                <h4>Welcome, {collegeName}</h4>
                {selectedCard ? (
                  <UploadForm onReturn={handleReturn} collectionName={selectedCard} />
                ) : (
                  <div className="row">
                    <Card title="Admission Data" content="Manage admission-related data." onClick={() => setSelectedCard("AdmissionData")} />
                    <Card
                      title="Curriculum Updates"
                      content="Update curriculum data."
                      onClick={() => setSelectedCard("CurriculumUpdates")}
                    />
                    <Card
                      title="Fee Structure"
                      content="Upload fee structure details."
                      onClick={() => setSelectedCard("FeeStructure")}
                    />
                    <Card
                      title="Scholarship Information"
                      content="Manage scholarship information."
                      onClick={() => setSelectedCard("ScholarshipData")}
                    />
                    <Card
                      title="Infrastructure Details"
                      content="Update infrastructure information."
                      onClick={() => setSelectedCard("InfrastructureDetails")}
                    />
                    <Card
                      title="Alumni Network"
                      content="Manage alumni data."
                      onClick={() => setSelectedCard("AlumniNetwork")}
                    />
                  </div>
                )}
                <div className="file-upload-container">
                  <input type="file" onChange={handleFileUpload} />
                  <button className="btn btn-primary">Upload PDF/Excel</button>
                </div>
              </div>
            ) : (
              <div className="content-container">
                <h4>Uploaded Data</h4>
                <ul>
                  {uploadedData.length > 0 ? (
                    uploadedData.map((data, index) => (
                      <li key={index}>
                        <p>{data.fileName}</p>
                        <p>{data.timestamp?.toDate().toString()}</p>
                      </li>
                    ))
                  ) : (
                    <p>No data uploaded yet.</p>
                  )}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="auth-container">
          <h2>Welcome! Please Login or Register</h2>
          <div className="auth-forms">
            <Login onLoginFailed={() => setIsRegistering(true)} onSwitchToRegister={() => setIsRegistering(true)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
