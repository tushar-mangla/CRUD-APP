import React, { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDashboardContext } from "../pages/Dashboard";
import { Profile, ChangePassword } from "../pages";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <div className="logout-container">
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => {
          setShowLogout(!showLogout);
        }}
      >
        {/* {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )} */}
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      {showLogout && (
        <div className="dropdown show-dropdown">
          <Profile />
          <ChangePassword />
          <button type="button" className="dropdown-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutContainer;
