import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormRow } from "../components";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import groupPhoto from "../images/groupPhoto.png";
import emailLogo from "../images/emailLogo.svg";
import mainLogo from "../images/mainLogo.svg";
import { toast } from "react-toastify";
import "../style/RegisterPage.scss";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/auth/register", data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <div className="LoginPageContainer">
      <div className="mainLogo">
        <img className="logo" src={mainLogo} />
        <p className="logoText">eSchool</p>
      </div>
      <div className="mainHeading">
        <p className="heading1">School Management Tool</p>
        <p className="heading2">
          For Improved Learning and <br /> Teaching experience !
        </p>
      </div>
      <div className="learnMoreSection">
        <button className="learnMoreButton">Learn More</button>
      </div>
      <div className="Loginpageform">
        <img className="mainImage" src={groupPhoto} />

        <div className="accountSection">
          <form className="form" method="post" onSubmit={handleSubmit}>
            <p className="formHeading2">Create Account</p>

            <div className="formRow">
              <FormRow
                className="formInput"
                type="string"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
            </div>

            <div className="formRow">
              <FormRow
                className="formInput"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
              />
            </div>

            <div className="formRow">
              <FormRow
                className="formInput"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="formRow">
              <FormRow
                className="formInput"
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={password}
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
          </form>
          <div className="alreadyPara">
            Already have an account ?
            <Link to="/login" className="LoginButton">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
