import React, { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import OrganizeCustomFields from "./OrganizeCustomFields";

const CustomFieldsProvider = ({ children }) => {
  const [customFieldsData, setCustomFieldsData] = useState([]);

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const fetchCustomFields = async () => {
    try {
      const response = await customFetch.get("/custom");
      if (response.data) {
        const organizedData = OrganizeCustomFields(response.data);
        console.log(organizedData);
        setCustomFieldsData(organizedData);
      } else {
        console.error("Error fetching custom fields: Invalid data");
      }
    } catch (error) {
      console.error("Error fetching custom fields:", error);
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { customFieldsData })
  );
};

export default CustomFieldsProvider;
