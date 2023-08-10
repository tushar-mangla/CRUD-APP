import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard Logo</div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/students" className="nav-link">
            Students
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className="nav-link">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
