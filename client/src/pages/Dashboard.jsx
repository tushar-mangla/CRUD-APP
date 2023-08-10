/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components"; // Import your Sidebar component
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

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
        setUser(data);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        navigate("/");
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
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="row-2">
            <Navbar />
          </div>
          <div className="row-10">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
