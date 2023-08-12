import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import leftArrow from "../images/leftArrow.svg";
import "../style/Settings.scss";

const EditCustomField = ({ EditCustomField }) => {
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
    <div className="customField">
      <div className="heading">
        <img
          className="hadingImage"
          src={leftArrow}
          onClick={() => setShowProfile(false)}
        />
        <p className="headingText">Manage your Security Settings</p>
      </div>
      <div className="topHeader">
        <p className="headerItems">Group</p>
        <p className="headerItems">Section</p>
        <p className="headerItems">Label</p>
        <p className="headerItems">Type</p>
      </div>
      <form className="inputField" onSubmit={handleSubmit}>
        {/* <label htmlFor="groupname">Group Name:</label> */}
        <input
          type="text"
          id="groupname"
          name="groupname"
          value={customField.groupname}
          onChange={handleChange}
        />

        {/* <label htmlFor="section">Section:</label> */}
        <input
          className="inputItems"
          type="text"
          id="section"
          name="section"
          value={customField.section}
          onChange={handleChange}
        />

        {/* <label htmlFor="label">Label:</label> */}
        <input
          className="inputItems"
          type="text"
          id="label"
          name="label"
          value={customField.label}
          onChange={handleChange}
        />

        {/* <label htmlFor="type">Type:</label> */}
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

        <button className="saveBtn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCustomField;
