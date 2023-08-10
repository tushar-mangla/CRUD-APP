import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../pages/Dashboard";

const Navbar = () => {
  const { user, logoutUser } = useDashboardContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user?.user?.name || "Guest"}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="profile/update-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
