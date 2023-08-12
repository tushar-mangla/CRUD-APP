import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../pages/Dashboard";
import "../style/Navbar.scss";
import { FaUser } from "react-icons/fa";
import globe from "../images/globe.svg";
import keyIcon from "../images/keyIcon.svg";
import logout from "../images/logout.svg";
import profileIcon from "../images/profileIcon.svg";
import upArrow from "../images/upArrow.svg";

const Navbar = () => {
  const { user, logoutUser } = useDashboardContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };
  const [showProfile, setShowProfile] = useState(false);
  const path = "";

  return (
    <nav className="navbar">
      <div className="path">{path}</div>
      <div className="navbarProfile">
        <img className="globe" src={globe} />
        {user?.user?.avatar ? (
          <img
            className="profileImage"
            src={user.user.avatar}
            alt={`${user.user.name} `}
          />
        ) : (
          <FaUser className="profileImage" />
        )}
        <div
          className="usernamAdmin"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="username">
            <div className="name">{user?.user?.name}</div>
            <img
              className={`arrow ${showProfile ? "uparrow" : ""}`}
              src={upArrow}
            />
          </div>
          <p className="admin">Admin</p>
        </div>
      </div>
      <div className={`profileModal ${showProfile ? "show" : "hide"}`}>
        <Link to="profile" className="items">
          <img className="itemImage" src={profileIcon} />
          <p className="itemPara">Profile</p>
        </Link>
        <Link to="profile/update-password" className="items">
          <img className="itemImage" src={keyIcon} />
          <p className="itemPara">Change Password</p>
        </Link>
        <Link to="/" className="items" onClick={handleLogout}>
          <img className="itemImage" src={logout} />
          <p className="itemPara">Log Out</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
