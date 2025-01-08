import React from 'react';
import './Navbar.css';

const Navbar = ({ isDashboardActive, onTabClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className={`nav-link ${isDashboardActive ? 'active' : ''}`}
              onClick={() => onTabClick('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${!isDashboardActive ? 'active' : ''}`}
              onClick={() => onTabClick('uploadedData')}
            >
              Uploaded Data
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
