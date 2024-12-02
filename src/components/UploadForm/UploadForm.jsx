import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
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

  return (
    <div className="upload-form-container">
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
          <button type="submit" className="submit-button">Upload</button>
          <button type="button" className="return-button" onClick={onReturn}>
            Return to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
