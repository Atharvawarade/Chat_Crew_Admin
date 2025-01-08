import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = ({ onSelect }) => {
  return (
    <div className="landing-page  text-center">
      <h1 className="landing-title">Welcome to the College Dashboard</h1>
      <div className="row justify-content-center mt-4">
        {/* DTE Dashboard Card */}
        <div className="col-md-4 mb-4">
          <div className="card" onClick={() => onSelect("DTE")}>
            <img
              src="https://hte.rajasthan.gov.in/dept//dte/uploads/images/logo/HTE_circle.jpg"
              className="card-img-top"
              alt="DTE Dashboard"
            />
            <div className="card-body">
              <h5 className="card-title">DTE Dashboard</h5>
              <p className="card-text">Explore Opportunities</p>
            </div>
          </div>
        </div>

        {/* College Dashboard Card */}
        <div className="col-md-4 mb-4">
          <div className="card" onClick={() => onSelect("College")}>
            <img
              src="https://www.pinkcitypost.com/wp-content/uploads/2023/04/ru-rajasthan-university-file-photo-xls2kx2.jpg"
              className="card-img-top"
              alt="College Dashboard"
            />
            <div className="card-body">
              <h5 className="card-title">College Dashboard</h5>
              <p className="card-text">Manage Data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
