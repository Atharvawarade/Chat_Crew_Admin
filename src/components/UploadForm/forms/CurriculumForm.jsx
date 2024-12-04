import React, { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc
import './AdmissionForm.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const CurriculumForm = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    academicYear: "",
    newCourses: "",
    syllabusUpdates: "",
    courseObjectives: "",
    creditsChanges: "",
    effectiveFrom: "",
    approvalAuthority: "",
    contact: "",
    notes: "",
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
      // Retrieve the college name from sessionStorage
      const collegeName = sessionStorage.getItem("collegeName");

      if (!collegeName) {
        alert("Error: College name not found in session.");
        return;
      }

      // Create the document ID using collegeName
      const docId = `${collegeName} Curriculum Details`;

      // Add document to the 'CurriculumUpdates' collection with custom ID
      const collectionRef = collection(db, "CurriculumUpdates");
      const docRef = doc(collectionRef, docId);
      await setDoc(docRef, { ...formData, timestamp: new Date() });

      alert("Curriculum data uploaded successfully!");
      setFormData({
        departmentName: "",
        academicYear: "",
        newCourses: "",
        syllabusUpdates: "",
        courseObjectives: "",
        creditsChanges: "",
        effectiveFrom: "",
        approvalAuthority: "",
        contact: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Error uploading data!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container container">
      <h2 className="form-title text-center mb-4">Upload Curriculum Updates</h2>
      <form onSubmit={handleSubmit} className="curriculum-form">
        {/* Department/Program Name */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Department/Program Name:</label>
            <input
              type="text"
              name="departmentName"
              className="form-control"
              onChange={handleChange}
              value={formData.departmentName}
              required
            />
          </div>
        </div>

        {/* Academic Year */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Academic Year:</label>
            <input
              type="text"
              name="academicYear"
              className="form-control"
              onChange={handleChange}
              value={formData.academicYear}
              required
            />
          </div>
        </div>

        {/* New Courses Introduced */}
        <div className="row mb-3">
          <div className="col-12">
            <label>New Courses Introduced:</label>
            <textarea
              name="newCourses"
              className="form-control"
              onChange={handleChange}
              value={formData.newCourses}
              required
            />
          </div>
        </div>

        {/* Syllabus Updates */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Syllabus Updates (Subject-wise):</label>
            <textarea
              name="syllabusUpdates"
              className="form-control"
              onChange={handleChange}
              value={formData.syllabusUpdates}
              required
            />
          </div>
        </div>

        {/* Course Objectives/Outcomes */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Course Objectives/Outcomes:</label>
            <textarea
              name="courseObjectives"
              className="form-control"
              onChange={handleChange}
              value={formData.courseObjectives}
              required
            />
          </div>
        </div>

        {/* Credits/Grading System Changes */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Credits/Grading System Changes:</label>
            <textarea
              name="creditsChanges"
              className="form-control"
              onChange={handleChange}
              value={formData.creditsChanges}
            />
          </div>
        </div>

        {/* Effective From (Date) */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Effective From (Date):</label>
            <input
              type="date"
              name="effectiveFrom"
              className="form-control"
              onChange={handleChange}
              value={formData.effectiveFrom}
              required
            />
          </div>
        </div>

        {/* Approval Authority */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Approval Authority:</label>
            <input
              type="text"
              name="approvalAuthority"
              className="form-control"
              onChange={handleChange}
              value={formData.approvalAuthority}
              required
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Contact Details (Academic Office):</label>
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
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CurriculumForm;
