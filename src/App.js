import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import UploadForm from './components/UploadForm/UploadForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user, setUser] = useState(null);
  const [collegeName, setCollegeName] = useState('');

  // Monitor authentication state and fetch college data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(
          collection(db, 'CollegesData'),
          where('email', '==', currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCollegeName(doc.data().collegeName);
        });
      } else {
        setCollegeName('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterSuccess = (college) => {
    setCollegeName(college);
  };

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleReturn = () => {
    setSelectedCard(null);
  };

  return (
    <div className="app-container">
      {user ? (
        <>
          <Sidebar isCollapsed={isCollapsed} onToggle={handleSidebarToggle} onLogout={() => signOut(auth)} />
          <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
            <Navbar />
            <div className="content-container">
              <h4>Welcome, {collegeName}</h4>
              {selectedCard ? (
                <UploadForm onReturn={handleReturn} collectionName={selectedCard} />
              ) : (
                <div className="row">
                  <Card
                    title="Admission Data"
                    content="Manage admission-related data."
                    onClick={() => setSelectedCard('AdmissionData')}
                    collegeName={collegeName}
                  />
                  <Card
                    title="Curriculum Updates"
                    content="Update curriculum data."
                    onClick={() => setSelectedCard('CurriculumUpdates')}
                  />
                  <Card
                    title="Fee Structure"
                    content="Upload fee structure details."
                    onClick={() => setSelectedCard('FeeStructure')}
                  />
                  <Card
                    title="Scholarship Information"
                    content="Manage scholarship information."
                    onClick={() => setSelectedCard('ScholarshipData')}
                  />
                  <Card
                    title="Infrastructure Details"
                    content="Update infrastructure information."
                    onClick={() => setSelectedCard('InfrastructureDetails')}
                  />
                  <Card
                    title="Alumni Network"
                    content="Manage alumni data."
                    onClick={() => setSelectedCard('AlumniNetwork')}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="auth-container">
          <h2>Welcome! Please Login or Register</h2>
          <div className="auth-forms">
            <Login />
            <Register onRegisterSuccess={handleRegisterSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
