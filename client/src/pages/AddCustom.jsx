import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const AddCustomField = () => {
  const navigate = useNavigate();

  const [customField, setCustomField] = useState({
    groupname: "",
    section: "",
    label: "",
    type: "text",
  });

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
      await customFetch.post("/custom", customField);
      navigate("/dashboard/settings");
    } catch (error) {
      console.error("Error creating custom field:", error);
    }
  };

  return (
    <div>
      <h2>Add Custom Field</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            name="groupname"
            value={customField.groupname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={customField.section}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Label:</label>
          <input
            type="text"
            name="label"
            value={customField.label}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
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
        <div>
          <button type="submit">Add Custom Field</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomField;
