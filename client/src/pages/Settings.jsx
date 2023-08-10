import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";

const GetAllCustoms = () => {
  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const fetchCustomFields = async () => {
    try {
      const response = await customFetch.get("/custom");
      setCustomFields(response.data);
    } catch (error) {
      console.error("Error fetching custom fields:", error);
    }
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await customFetch.delete(`/custom/${fieldId}`);
      fetchCustomFields();
    } catch (error) {
      console.error("Error deleting custom field:", error);
    }
  };

  return (
    <div>
      <Link to="/dashboard/settings/addCustom" className="btn btn-primary">
        Add Custom
      </Link>
      <h2>All Custom Fields</h2>
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Section</th>
            <th>Label</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customFields.map((field) => (
            <tr key={field._id}>
              <td>{field.groupname}</td>
              <td>{field.section}</td>
              <td>{field.label}</td>
              <td>
                <input type={field.type} />
              </td>
              <td>
                <Link
                  to={`/dashboard/settings/${field._id}`}
                  state={{ fieldDetails: field }}
                >
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDeleteField(field._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllCustoms;
