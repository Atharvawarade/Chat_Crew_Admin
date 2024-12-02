import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import UploadForm from './components/UploadForm/UploadForm';
import './App.css';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleReturn = () => {
    setSelectedCard(null); // Return to card view
  };

  return (
    <div className="app-container">
      <Sidebar isCollapsed={isCollapsed} onToggle={handleSidebarToggle} />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Navbar />
        <div className="content-container">
          {selectedCard ? (
            <UploadForm
              onReturn={handleReturn}
              collectionName={selectedCard}
            />
          ) : (
            <div className="row">
              <Card
                title="Admission Data"
                content="Manage admission-related data."
                onClick={() => setSelectedCard('AdmissionData')}
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
    </div>
  );
};

export default App;
