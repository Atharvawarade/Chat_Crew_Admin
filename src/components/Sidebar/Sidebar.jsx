import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <div className={`sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="btn btn-light btn-sm m-2" onClick={onToggle}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      <ul className="nav flex-column">
        <li className="nav-item"><a href="#" className="nav-link text-white">Dashboard</a></li>
        <li className="nav-item"><a href="#" className="nav-link text-white">Profile</a></li>
        <li className="nav-item"><a href="#" className="nav-link text-white">Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
