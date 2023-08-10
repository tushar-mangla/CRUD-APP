import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const EditCustomField = () => {
  const { customId } = useParams();
  const navigate = useNavigate();

  const [customField, setCustomField] = useState({
    groupname: "",
    section: "",
    label: "",
    type: "",
  });

  useEffect(() => {
    const fetchCustomField = async () => {
      try {
        const response = await customFetch.get(`/custom/${customId}`);
        setCustomField(response.data);
      } catch (error) {
        console.error("Error fetching custom field:", error);
      }
    };

    fetchCustomField();
  }, [customId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomField((prevCustomField) => ({
      ...prevCustomField,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFetch.patch(`/custom/${customId}`, customField);
      navigate("/dashboard/settings");
    } catch (error) {
      console.error("Error updating custom field:", error);
    }
  };

  return (
    <div>
      <h2>Edit Custom Field</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="groupname">Group Name:</label>
          <input
            type="text"
            id="groupname"
            name="groupname"
            value={customField.groupname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            name="section"
            value={customField.section}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="label">Label:</label>
          <input
            type="text"
            id="label"
            name="label"
            value={customField.label}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            name="type"
            value={customField.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="text">Text</option>
            <option value="input">Input</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCustomField;
