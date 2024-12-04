import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc
import './AdmissionForm.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const InfrastructureForm = () => {
  const [formData, setFormData] = useState({
    campusName: '',
    totalArea: '',
    numberOfClassrooms: '',
    libraryFacilities: '',
    laboratories: '',
    sportsFacilities: '',
    hostelAccommodation: '',
    medicalFacilities: '',
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
      const collegeName = sessionStorage.getItem('collegeName'); // Retrieve from session
      const docName = `${collegeName} Infrastructure Details`; // Combine for the document name
      const docRef = doc(collection(db, 'InfrastructureData'), docName); // Use doc to create a specific document

      await setDoc(docRef, { ...formData, timestamp: new Date() });

      alert('Infrastructure data uploaded successfully!');
      setFormData({
        campusName: '',
        totalArea: '',
        numberOfClassrooms: '',
        libraryFacilities: '',
        laboratories: '',
        sportsFacilities: '',
        hostelAccommodation: '',
        medicalFacilities: '',
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
      <h2 className="form-title text-center mb-4">Upload Infrastructure Details</h2>
      <form onSubmit={handleSubmit} className="infrastructure-form">
        {/* Campus Name/Location */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Campus Name/Location:</label>
            <input
              type="text"
              name="campusName"
              className="form-control"
              onChange={handleChange}
              value={formData.campusName}
              required
            />
          </div>
        </div>

        {/* Total Area */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Total Area (in acres/sq. ft.):</label>
            <input
              type="text"
              name="totalArea"
              className="form-control"
              onChange={handleChange}
              value={formData.totalArea}
              required
            />
          </div>
        </div>

        {/* Number of Classrooms */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Number of Classrooms:</label>
            <input
              type="number"
              name="numberOfClassrooms"
              className="form-control"
              onChange={handleChange}
              value={formData.numberOfClassrooms}
              required
            />
          </div>
        </div>

        {/* Library Facilities */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Library Facilities (Books, Journals):</label>
            <textarea
              name="libraryFacilities"
              className="form-control"
              onChange={handleChange}
              value={formData.libraryFacilities}
              required
            />
          </div>
        </div>

        {/* Laboratories */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Laboratories (Details):</label>
            <textarea
              name="laboratories"
              className="form-control"
              onChange={handleChange}
              value={formData.laboratories}
              required
            />
          </div>
        </div>

        {/* Sports Facilities */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Sports Facilities:</label>
            <textarea
              name="sportsFacilities"
              className="form-control"
              onChange={handleChange}
              value={formData.sportsFacilities}
              required
            />
          </div>
        </div>

        {/* Hostel Accommodation */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Hostel Accommodation Details:</label>
            <textarea
              name="hostelAccommodation"
              className="form-control"
              onChange={handleChange}
              value={formData.hostelAccommodation}
              required
            />
          </div>
        </div>

        {/* Medical Facilities */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Medical Facilities:</label>
            <textarea
              name="medicalFacilities"
              className="form-control"
              onChange={handleChange}
              value={formData.medicalFacilities}
              required
            />
          </div>
        </div>

        {/* Contact for Queries */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Contact for Infrastructure Queries:</label>
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

export default InfrastructureForm;
