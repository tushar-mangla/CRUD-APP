import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormRow } from "../components";
import Logo from "../components/Logo";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import "../css/Register.css";
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
    <div className="rectangle-1 d-flex justify-content-center">
      <div className="container rectangle-2">
        <div className="d-flex  align-items-start header">
          <div>
            <Logo />
          </div>
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <div className="h5 header-text1">School Management Tool </div>
            <div className="h3 header-text2">
              <div className="d-flex flex-column text-start">
                <div className="row text-center">For Improved Learning and</div>
                <div className="row text-center">Teaching experience !</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row layout">
          <div className="col layout-img">
            <img
              src="../../public/Images/login.png"
              className="img-fluid"
              alt="Login image"
            />
          </div>
          <div className="login-form">
            <div className="row rectangle-3">
              <div className="col">
                <div className="row d-flex justify-content-center">
                  <h2
                    style={{
                      color: "#000",
                      textAlign: "center",
                      fontFamily: "Urbanist",
                    }}
                  >
                    Create Account
                  </h2>
                </div>

                <div className="mini-container">
                  <div className="row">
                    <form method="post" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col form-row field">
                          <FormRow
                            className="col email-input"
                            type="string"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        <div className="col form-row field">
                          <FormRow
                            className="col email-input"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        <div className="col form-row field">
                          <FormRow
                            className="col email-input"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        <div className="col form-row field">
                          <FormRow
                            className="col email-input"
                            type="password"
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={password}
                            placeholder="Confirm Password"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <button
                          type="submit"
                          className="btn btn-primary btn-login"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-2 text-center">
              <div
                className="col-9 text-end"
                style={{
                  paddingRight: "1px",
                }}
              >
                Already have an account?
              </div>
              <div className="col-3 text-start" style={{ paddingLeft: "1px" }}>
                <a href="/login" style={{ textDecoration: "none" }}>
                  log in
                </a>
              </div>
            </div>
          </div>
          {/* <div className="login-form">
            <div className="row rectangle-3">
              <div className="col">
                <div className="row welcome">
                  <h2>Create Account</h2>
                </div>

                <div className="mini-container">
                  <div className="row">
                    <form method="post" onSubmit={handleSubmit}>
                      <div className="form-row">
                        <>
                          <div className="row">
                            <div className="col form-row field">
                              <FormRow
                                className="col email-input"
                                type="string"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Name"
                                style={{ marginRight: "10px" }}
                              />
                            </div>
                            <div
                              className="col form-row field"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FormRow
                                className="col email-input"
                                type="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Email"
                                style={{ marginRight: "10px" }}
                              />
                            </div>
                            <div className="col form-row field">
                              <FormRow
                                className="col email-input"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Password"
                                style={{ marginRight: "10px" }}
                              />
                            </div>
                            <div className="col form-row field">
                              <FormRow
                                className="col email-input"
                                type="password"
                                name="confirmPassword"
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                style={{ marginRight: "10px" }}
                              />
                            </div>
                          </div>
                        </>
                      </div>
                      <div className="row">
                        <button
                          type="submit"
                          className="btn btn-primary btn-login"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">Already have an account?</div>
              <div className="col">
                <a href="/login">Login</a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
