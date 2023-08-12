import React, { useEffect, useState } from "react";
import { BarChartComponent } from "../components";
import { toast } from "react-toastify";
import { useDashboardContext } from "../pages/Dashboard";
import customFetch from "../utils/customFetch";

const Stats = () => {
  const [data, setData] = useState([]);
  const { user } = useDashboardContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await customFetch.get("/users/stats");
          // console.log(response);
          setData(response.data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  return <BarChartComponent data={data} />;
};

export default Stats;
