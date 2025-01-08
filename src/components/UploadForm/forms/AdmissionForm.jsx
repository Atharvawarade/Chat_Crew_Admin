import React, { useState } from "react";
import { db } from "../../../firebase"; // Firebase configuration
import { doc, setDoc } from "firebase/firestore";
import "./AdmissionForm.css"; // Custom CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    institutionName: "",
    startDate: "",
    endDate: "",
    coursesOffered: "",
    eligibility: "",
    procedure: "",
    documents: "",
    fee: "",
    contact: "",
    notes: "",
  });

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const collegeName = sessionStorage.getItem("collegeName");

      if (!collegeName) {
        alert("Error: College name not found in session.");
        setIsLoading(false);
        return;
      }

      // Save form data to Firestore with the document name as "Admission Details {collegeName}"
      const docId = `Admission Details ${collegeName}`;
      const docRef = doc(db, "AdmissionData", docId);

      await setDoc(docRef, {
        ...formData,
        timestamp: new Date(),
      });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const collegeName = sessionStorage.getItem("collegeName");

      if (!collegeName) {
        alert("Error: College name not found in session.");
        setIsLoading(false);
        return;
      }

      // Ensure a file is selected before proceeding
      if (!file) {
        alert("Please select a file to upload.");
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("file", file); // Add the file to formData

      // Send the file to the server
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const { filePath } = await response.json();

      // Save file path to Firestore with the document name as "Admission Details {collegeName} File"
      const docId = `Admission Details ${collegeName} File`;
      const docRef = doc(db, "AdmissionData", docId);

      await setDoc(docRef, {
        filePath,
        fileName: file.name,
        timestamp: new Date(),
      });

      alert("File uploaded and path saved successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h3>Admission Form</h3>
        </div>
        <div className="card-body">
          {/* Form Section */}
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Institution Name</label>
                <input
                  type="text"
                  name="institutionName"
                  className="form-control"
                  value={formData.institutionName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Courses Offered</label>
                <textarea
                  name="coursesOffered"
                  className="form-control"
                  rows="3"
                  value={formData.coursesOffered}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Eligibility Criteria</label>
                <textarea
                  name="eligibility"
                  className="form-control"
                  rows="3"
                  value={formData.eligibility}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Procedure</label>
                <textarea
                  name="procedure"
                  className="form-control"
                  rows="3"
                  value={formData.procedure}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Documents Required</label>
                <textarea
                  name="documents"
                  className="form-control"
                  rows="3"
                  value={formData.documents}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Fee Structure</label>
                <textarea
                  name="fee"
                  className="form-control"
                  rows="3"
                  value={formData.fee}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Information</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Additional Notes</label>
                <input
                  type="text"
                  name="notes"
                  className="form-control"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Form Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Form"}
            </button>
          </form>

          {/* File Upload Section */}
          <div className="file-upload-section mt-4">
            <h6>Upload File</h6>
            <div className="mb-3">
              <label className="form-label">Choose File</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
              />
            </div>

            {/* File Upload Submit Button */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleFileUpload}
              disabled={isLoading || !file}
            >
              {isLoading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
