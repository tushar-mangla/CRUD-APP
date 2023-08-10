import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";

const CreateCustomField = () => {
  const navigate = useNavigate();
  const [fieldDetails, setFieldDetails] = useState({
    groupname: "",
    section: "",
    label: "",
    type: "text",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFetch.post("/api/v1/custom-fields", fieldDetails);
      navigate("/custom-fields");
    } catch (error) {
      console.error("Error creating custom field:", error);
    }
  };

  return (
    <div>
      <h2>Create Custom Field</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupname">Group Name:</label>
        <input
          type="text"
          id="groupname"
          name="groupname"
          value={fieldDetails.groupname}
          onChange={handleChange}
        />

        <label htmlFor="section">Section:</label>
        <input
          type="text"
          id="section"
          name="section"
          value={fieldDetails.section}
          onChange={handleChange}
        />

        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={fieldDetails.label}
          onChange={handleChange}
        />

        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={fieldDetails.type}
          onChange={handleChange}
        >
          <option value="text">Text</option>
          <option value="input">Input</option>
          <option value="checkbox">Checkbox</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio</option>
        </select>

        <button type="submit">Create Custom Field</button>
      </form>
    </div>
  );
};

export default CreateCustomField;
