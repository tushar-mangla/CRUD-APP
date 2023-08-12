import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
// import { useDashboardContext } from "../pages/Dashboard";
import { toast } from "react-toastify";
import bullet from "../images/bullet.svg";
import leftArrow from "../images/leftArrow.svg";

const ChangePassword = () => {
  // const { user } = useDashboardContext();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (passwords.newPassword !== passwords.confirmPassword) {
        console.error("New passwords do not match.");
        toast.error("New passwords do not match.");
        return;
      }

      const requestBody = {
        previousPassword: passwords.previousPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      };

      await customFetch.put(`/users/update-password`, requestBody);
      toast.success("Password changed successfully.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred.");

      console.log(error.response.data.msg);
    }
  };

  return (
    <div className="ChangePasswordContainer">
      <div className="rightSide">
        <div className="password">
          <div className="heading"></div>
          <p className="subheading">Change your password.</p>

          <form onSubmit={handleSubmit}>
            <div className="input">
              <p className="inputHeading">Old Password</p>
              <input
                className="inpputText"
                type="password"
                id="previousPassword"
                name="previousPassword"
                value={passwords.previousPassword}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <p className="inputHeading">New Password</p>
              <input
                className="inpputText"
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="input">
              <p className="inputHeading">Confirm Password</p>
              <input
                className="inpputText"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="bulletList">
              <div className="list">
                <img className="listImage" src={bullet} />
                <p className="listPara">Atleast 1 Special characters</p>
              </div>
              <div className="list">
                <img className="listImage" src={bullet} />
                <p className="listPara">Atleast 1 Lowercase letter</p>
              </div>
              <div className="list">
                <img className="listImage" src={bullet} />
                <p className="listPara">Atleast 1 Uppercase letter</p>
              </div>
              <div className="list">
                <img className="listImage" src={bullet} />
                <p className="listPara">Atleast 1 Digit</p>
              </div>
              <div className="list">
                <img className="listImage" src={bullet} />
                <p className="listPara">Atleast 8 characters</p>
              </div>
            </div>

            <div>
              <div className="button">
                <button className="save" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
