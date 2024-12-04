import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import AdmissionForm from './forms/AdmissionForm';
import CurriculumForm from './forms/CurriculumForm';
import FeeStructureForm from './forms/FeeStructureForm';
import ScholarshipForm from './forms/ScholarshipForm';
import InfrastructureForm from './forms/InfrastructureForm';
import AlumniForm from './forms/AlumniForm';
import './UploadForm.css'; // Import the custom CSS

const UploadForm = ({ onReturn, collectionName }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !file) {
      alert('Please provide a description and a file.');
      return;
    }

    try {
      if (!collectionName) {
        console.error('Collection name is missing!');
        alert('Collection name is missing!');
        return;
      }

      const collectionRef = collection(db, collectionName);

      await addDoc(collectionRef, {
        description,
        fileName: file.name,
        timestamp: new Date(),
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const renderCustomForm = () => {
    switch (collectionName) {
      case 'AdmissionData':
        return <AdmissionForm />;
      case 'CurriculumUpdates':
        return <CurriculumForm />;
      case 'FeeStructure':
        return <FeeStructureForm />;
      case 'ScholarshipData':
        return <ScholarshipForm />;
      case 'InfrastructureDetails':
        return <InfrastructureForm />;
      case 'AlumniNetwork':
        return <AlumniForm />;
      default:
        return null; // No custom form for this collection, fallback to the default form
    }
  };

  const customForm = renderCustomForm();

  return (
    <div className="upload-form-container">
      <button type="button" className="return-button " onClick={onReturn}>
      Back
      </button>
      {customForm ? (
        <>{customForm}</>
      ) : (
        <>
          <h2 className="upload-form-title">Upload to {collectionName}</h2>
          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>File:</label>
              <input
                type="file"
                accept=".pdf,.xlsx,.xls"
                onChange={handleFileChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Upload
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UploadForm;
