import { useState, useEffect } from "react";
import { BarChartComponent } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get("/users/stats");
        setData(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };

    fetchData();
  }, []);

  return <BarChartComponent data={data} />;
};

export default Stats;
