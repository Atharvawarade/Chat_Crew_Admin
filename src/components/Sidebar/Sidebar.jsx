import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, onLogout }) => {
  return (
    <div className={`sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="btn btn-light btn-sm m-2" onClick={onToggle}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <ul className="nav flex-column">
        <li className="nav-item"><a href="#" className="nav-link text-white">Dashboard</a></li>
        <li className="nav-item"><a href="#" className="nav-link text-white">Profile</a></li>
        <li className="nav-item"><a href="#" className="nav-link text-white">Settings</a></li>
        {/* Add Logout Button */}
        <li className="nav-item mt-3">
          <button className="btn btn-danger btn-sm w-100" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
