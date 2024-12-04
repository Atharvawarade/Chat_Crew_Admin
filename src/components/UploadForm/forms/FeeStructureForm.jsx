import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore"; // Add doc and setDoc here
import "./AdmissionForm.css"; // Custom CSS for styling
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const FeeStructureForm = () => {
  const [formData, setFormData] = useState({
    programName: "",
    tuitionFee: "",
    hostelFee: "",
    labFees: "",
    scholarshipOptions: "",
    paymentModes: "",
    lateFeePenalty: "",
    effectiveYear: "",
    feeContact: "",
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
      const collegeName = sessionStorage.getItem("collegeName"); // Retrieve from session
      const docName = `${collegeName} Fee Details`; // Combine for the document name
      const docRef = doc(collection(db, "FeeStructure"), docName);

      await setDoc(docRef, { ...formData, timestamp: new Date() });

      alert("Fee structure data uploaded successfully!");
      setFormData({
        programName: "",
        tuitionFee: "",
        hostelFee: "",
        labFees: "",
        scholarshipOptions: "",
        paymentModes: "",
        lateFeePenalty: "",
        effectiveYear: "",
        feeContact: "",
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
      <h2 className="form-title text-center mb-4">Upload Fee Structure</h2>
      <form onSubmit={handleSubmit} className="fee-structure-form">
        {/* Program Name */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Program Name:</label>
            <input
              type="text"
              name="programName"
              className="form-control"
              onChange={handleChange}
              value={formData.programName}
              required
            />
          </div>
        </div>

        {/* Tuition Fee */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Tuition Fee (per semester/year):</label>
            <input
              type="number"
              name="tuitionFee"
              className="form-control"
              onChange={handleChange}
              value={formData.tuitionFee}
              required
            />
          </div>

          {/* Hostel Fee */}
          <div className="col-md-6">
            <label>Hostel Fee (if applicable):</label>
            <input
              type="number"
              name="hostelFee"
              className="form-control"
              onChange={handleChange}
              value={formData.hostelFee}
            />
          </div>
        </div>

        {/* Laboratory/Other Fees */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Laboratory/Other Fees:</label>
            <input
              type="number"
              name="labFees"
              className="form-control"
              onChange={handleChange}
              value={formData.labFees}
            />
          </div>
        </div>

        {/* Scholarship Options */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Scholarship Options Available:</label>
            <textarea
              name="scholarshipOptions"
              className="form-control"
              onChange={handleChange}
              value={formData.scholarshipOptions}
            />
          </div>
        </div>

        {/* Payment Modes Accepted */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Payment Modes Accepted:</label>
            <textarea
              name="paymentModes"
              className="form-control"
              onChange={handleChange}
              value={formData.paymentModes}
              required
            />
          </div>
        </div>

        {/* Late Fee Penalty */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Late Fee Penalty (if any):</label>
            <input
              type="text"
              name="lateFeePenalty"
              className="form-control"
              onChange={handleChange}
              value={formData.lateFeePenalty}
            />
          </div>
        </div>

        {/* Effective Academic Year */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Effective Academic Year:</label>
            <input
              type="text"
              name="effectiveYear"
              className="form-control"
              onChange={handleChange}
              value={formData.effectiveYear}
              required
            />
          </div>
        </div>

        {/* Contact for Fee Queries */}
        <div className="row mb-3">
          <div className="col-12">
            <label>Contact for Fee Queries (Email/Phone):</label>
            <input
              type="text"
              name="feeContact"
              className="form-control"
              onChange={handleChange}
              value={formData.feeContact}
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

export default FeeStructureForm;
