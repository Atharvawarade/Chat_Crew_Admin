import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore'; // Use setDoc to specify the document ID
import './AdmissionForm.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const AlumniForm = () => {
  const [formData, setFormData] = useState({
    alumniAssociationName: '',
    totalNumberOfAlumni: '',
    prominentAlumniAchievements: '',
    eventsConducted: '',
    mentorshipPrograms: '',
    jobOpportunities: '',
    alumniContactDatabase: '',
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
      const documentId = `${formData.alumniAssociationName} Alumni Details`; // Create the document name
      const docRef = doc(db, 'AlumniData', documentId); // Use setDoc to specify the document ID
      await setDoc(docRef, { ...formData, timestamp: new Date() }); // Upload data to Firebase
      alert('Alumni data uploaded successfully!');
      setFormData({
        alumniAssociationName: '',
        totalNumberOfAlumni: '',
        prominentAlumniAchievements: '',
        eventsConducted: '',
        mentorshipPrograms: '',
        jobOpportunities: '',
        alumniContactDatabase: '',
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
      <h2 className="form-title text-center mb-4">Upload Alumni Association Details</h2>
      <form onSubmit={handleSubmit} className="alumni-form">
        {/* Alumni Association Name */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Alumni Association Name:</label>
            <input
              type="text"
              name="alumniAssociationName"
              className="form-control"
              onChange={handleChange}
              value={formData.alumniAssociationName}
              required
            />
          </div>
        </div>

        {/* Total Number of Alumni */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Total Number of Alumni:</label>
            <input
              type="number"
              name="totalNumberOfAlumni"
              className="form-control"
              onChange={handleChange}
              value={formData.totalNumberOfAlumni}
              required
            />
          </div>
        </div>

        {/* Prominent Alumni Achievements */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Prominent Alumni Achievements:</label>
            <textarea
              name="prominentAlumniAchievements"
              className="form-control"
              onChange={handleChange}
              value={formData.prominentAlumniAchievements}
              required
            />
          </div>
        </div>

        {/* Events/Meetings Conducted */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Events/Meetings Conducted:</label>
            <textarea
              name="eventsConducted"
              className="form-control"
              onChange={handleChange}
              value={formData.eventsConducted}
              required
            />
          </div>
        </div>

        {/* Mentorship Programs */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Mentorship Programs Available:</label>
            <textarea
              name="mentorshipPrograms"
              className="form-control"
              onChange={handleChange}
              value={formData.mentorshipPrograms}
              required
            />
          </div>
        </div>

        {/* Job/Internship Opportunities */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Job/Internship Opportunities for Students:</label>
            <textarea
              name="jobOpportunities"
              className="form-control"
              onChange={handleChange}
              value={formData.jobOpportunities}
              required
            />
          </div>
        </div>

        {/* Alumni Contact Database */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Alumni Contact Database (optional):</label>
            <textarea
              name="alumniContactDatabase"
              className="form-control"
              onChange={handleChange}
              value={formData.alumniContactDatabase}
            />
          </div>
        </div>

        {/* Contact for Alumni Queries */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Contact for Alumni Queries:</label>
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

export default AlumniForm;
