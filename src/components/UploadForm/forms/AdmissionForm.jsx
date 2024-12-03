import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

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

  const [isLoading, setIsLoading] = useState(false); // To track form submission

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true during form submission

    try {
      const collectionRef = collection(db, 'AdmissionData');
      await addDoc(collectionRef, { ...formData, timestamp: new Date() });
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
      }); // Reset the form
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data!');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admission-form">
      <label>Name of Institution:</label>
      <input
        type="text"
        name="institutionName"
        onChange={handleChange}
        value={formData.institutionName}
        required
      />

      <label>Admission Start Date:</label>
      <input
        type="date"
        name="startDate"
        onChange={handleChange}
        value={formData.startDate}
        required
      />

      <label>Admission End Date:</label>
      <input
        type="date"
        name="endDate"
        onChange={handleChange}
        value={formData.endDate}
        required
      />

      <label>Courses Offered:</label>
      <textarea
        name="coursesOffered"
        onChange={handleChange}
        value={formData.coursesOffered}
        required
      />

      <label>Eligibility Criteria:</label>
      <textarea
        name="eligibility"
        onChange={handleChange}
        value={formData.eligibility}
        required
      />

      <label>Admission Procedure:</label>
      <textarea
        name="procedure"
        onChange={handleChange}
        value={formData.procedure}
        required
      />

      <label>Documents Required:</label>
      <textarea
        name="documents"
        onChange={handleChange}
        value={formData.documents}
        required
      />

      <label>Application Fee:</label>
      <input
        type="number"
        name="fee"
        onChange={handleChange}
        value={formData.fee}
        required
      />

      <label>Contact Details:</label>
      <input
        type="text"
        name="contact"
        onChange={handleChange}
        value={formData.contact}
        required
      />

      <label>Additional Notes:</label>
      <textarea
        name="notes"
        onChange={handleChange}
        value={formData.notes}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Submit'}
      </button>
    </form>
  );
};

export default AdmissionForm;
