import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../style/Dashboard.scss";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await customFetch.get("/users/current-user");
        if (data) {
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        user,
        logoutUser,
      }}
    >
      <div className="ChangePasswordContainer">
        <div className="leftSide">
          <Sidebar />
        </div>
        <div className="rightSide">
          <div className="navbarSection">
            <Navbar />
          </div>
          <div className="row-10">{<Outlet context={{ user }} />}</div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
