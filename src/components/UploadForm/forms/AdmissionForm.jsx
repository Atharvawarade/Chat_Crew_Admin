import React, { useState } from 'react';
import { db } from '../../../firebase'; // Adjust the import path as necessary
import { doc, setDoc } from 'firebase/firestore';
import './AdmissionForm.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    startDate: '',
    endDate: '',
    coursesOffered: '',
    eligibility: '',
    procedure: '',
    documents: '',
    fee: '',
    contact: '',
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
      // Retrieve the collegeName from session storage
      const collegeName = sessionStorage.getItem('collegeName');

      if (!collegeName) {
        alert('Error: College name not found in session.');
        setIsLoading(false);
        return;
      }

      // Use the college name for the document ID
      const docId = `${collegeName} Admission Details`;
      const docRef = doc(db, 'AdmissionData', docId);

      await setDoc(docRef, { ...formData, timestamp: new Date() });

      alert('Admission Data uploaded successfully!');
      setFormData({
        institutionName: '',
        startDate: '',
        endDate: '',
        coursesOffered: '',
        eligibility: '',
        procedure: '',
        documents: '',
        fee: '',
        contact: '',
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
      <h2 className="form-title text-center mb-4">Upload Admission Data</h2>
      <form onSubmit={handleSubmit} className="admission-form">
        {/* Institution Name */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Name of Institution:</label>
            <input
              type="text"
              name="institutionName"
              className="form-control"
              onChange={handleChange}
              value={formData.institutionName}
              required
            />
          </div>
        </div>

        {/* Admission Start and End Dates */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Admission Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              onChange={handleChange}
              value={formData.startDate}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Admission End Date:</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              onChange={handleChange}
              value={formData.endDate}
              required
            />
          </div>
        </div>

        {/* Courses Offered and Eligibility */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Courses Offered:</label>
            <textarea
              name="coursesOffered"
              className="form-control"
              onChange={handleChange}
              value={formData.coursesOffered}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Eligibility Criteria:</label>
            <textarea
              name="eligibility"
              className="form-control"
              onChange={handleChange}
              value={formData.eligibility}
              required
            />
          </div>
        </div>

        {/* Admission Procedure and Documents */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Admission Procedure:</label>
            <textarea
              name="procedure"
              className="form-control"
              onChange={handleChange}
              value={formData.procedure}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Documents Required:</label>
            <textarea
              name="documents"
              className="form-control"
              onChange={handleChange}
              value={formData.documents}
              required
            />
          </div>
        </div>

        {/* Application Fee and Contact */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Application Fee:</label>
            <input
              type="number"
              name="fee"
              className="form-control"
              onChange={handleChange}
              value={formData.fee}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Contact Details:</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              onChange={handleChange}
              value={formData.contact}
              required
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Additional Notes:</label>
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

export default AdmissionForm;
