import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import './AdmissionForm.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    scholarshipName: '',
    eligibilityCriteria: '',
    scholarshipAmount: '',
    applicationStartDate: '',
    applicationEndDate: '',
    documentsRequired: '',
    applicationProcedure: '',
    contactQueries: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Retrieve the college name from sessionStorage or use a default value
      const collegeName = sessionStorage.getItem('collegeName');

      

      const docName = `${collegeName} Scholarship Details`; // Document name format

      // Add the document to the ScholarshipData collection with the custom name
      const collectionRef = collection(db, 'ScholarshipData');
      const docRef = doc(collectionRef, docName); // Using doc to specify custom name
      await setDoc(docRef, { ...formData, timestamp: new Date() }); // Save data

      alert('Scholarship data uploaded successfully!');
      setFormData({
        scholarshipName: '',
        eligibilityCriteria: '',
        scholarshipAmount: '',
        applicationStartDate: '',
        applicationEndDate: '',
        documentsRequired: '',
        applicationProcedure: '',
        contactQueries: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container container">
      <h2 className="form-title text-center mb-4">Upload Scholarship Information</h2>
      <form onSubmit={handleSubmit} className="scholarship-form">
        {/* Scholarship Name */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Scholarship Name:</label>
            <input
              type="text"
              name="scholarshipName"
              className="form-control"
              onChange={handleChange}
              value={formData.scholarshipName}
              required
            />
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Eligibility Criteria:</label>
            <textarea
              name="eligibilityCriteria"
              className="form-control"
              onChange={handleChange}
              value={formData.eligibilityCriteria}
              required
            />
          </div>
        </div>

        {/* Scholarship Amount/Benefits */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Scholarship Amount/Benefits:</label>
            <textarea
              name="scholarshipAmount"
              className="form-control"
              onChange={handleChange}
              value={formData.scholarshipAmount}
              required
            />
          </div>
        </div>

        {/* Application Start Date and End Date */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Application Start Date:</label>
            <input
              type="date"
              name="applicationStartDate"
              className="form-control"
              onChange={handleChange}
              value={formData.applicationStartDate}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Application End Date:</label>
            <input
              type="date"
              name="applicationEndDate"
              className="form-control"
              onChange={handleChange}
              value={formData.applicationEndDate}
              required
            />
          </div>
        </div>

        {/* Documents Required */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Documents Required:</label>
            <textarea
              name="documentsRequired"
              className="form-control"
              onChange={handleChange}
              value={formData.documentsRequired}
              required
            />
          </div>
        </div>

        {/* Application Procedure */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Application Procedure (Step-by-step):</label>
            <textarea
              name="applicationProcedure"
              className="form-control"
              onChange={handleChange}
              value={formData.applicationProcedure}
              required
            />
          </div>
        </div>

        {/* Contact for Queries */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Contact for Queries (Email/Phone):</label>
            <input
              type="text"
              name="contactQueries"
              className="form-control"
              onChange={handleChange}
              value={formData.contactQueries}
              required
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Additional Notes (if any):</label>
            <textarea
              name="notes"
              className="form-control"
              onChange={handleChange}
              value={formData.notes}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ScholarshipForm;
