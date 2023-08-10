import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
// import { useDashboardContext } from "../pages/Dashboard";
import { toast } from "react-toastify";

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
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="previousPassword">Previous Password:</label>
        <input
          type="password"
          id="previousPassword"
          name="previousPassword"
          value={passwords.previousPassword}
          onChange={handleChange}
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
