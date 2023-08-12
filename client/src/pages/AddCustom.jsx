// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import customFetch from "../utils/customFetch";
// import leftArrow from "../images/leftArrow.svg";

// const AddCustomField = ({ setShowProfile }) => {
//   const navigate = useNavigate();

//   const [customField, setCustomField] = useState({
//     groupname: "",
//     section: "",
//     label: "",
//     type: "text",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomField((prevCustomField) => ({
//       ...prevCustomField,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await customFetch.post("/custom", customField);
//       navigate("/dashboard/settings");
//     } catch (error) {
//       console.error("Error creating custom field:", error);
//     }
//   };

//   return (
//     <div className="customField">
//       <div className="heading">
//         <img
//           className="hadingImage"
//           src={leftArrow}
//           onClick={() => setShowProfile(false)}
//         />
//         <p className="headingText">Manage your Security Settings</p>
//       </div>
//       <div className="topHeader">
//         <p className="headerItems">Group</p>
//         <p className="headerItems">Section</p>
//         <p className="headerItems">Label</p>
//         <p className="headerItems">Type</p>
//       </div>
//       <form className="inputField" onSubmit={handleSubmit}>
//         <input
//           className="inputItems"
//           type="text"
//           name="groupname"
//           value={customField.groupname}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="inputItems"
//           type="text"
//           name="section"
//           value={customField.section}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="inputItems"
//           type="text"
//           name="label"
//           value={customField.label}
//           onChange={handleChange}
//           required
//         />
//         <select
//           className="inputItems"
//           name="type"
//           value={customField.type}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Type</option>
//           <option value="text">Text</option>
//           <option value="input">Input</option>
//           <option value="checkbox">Checkbox</option>
//         </select>
//         <div>
//           <button type="submit">Add Custom Field</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCustomField;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import leftArrow from "../images/leftArrow.svg";
import "../style/Settings.scss";

const AddCustomField = ({ setShowProfile }) => {
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
    setShowProfile(false);
    window.location.reload();
  };

  return (
    <div className="customField">
      <div className="heading">
        <img
          className="hadingImage"
          src={leftArrow}
          onClick={() => setShowProfile(false)}
          alt="Go back"
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
        <input
          className="inputItems"
          type="text"
          name="groupname"
          value={customField.groupname}
          onChange={handleChange}
          required
        />
        <input
          className="inputItems"
          type="text"
          name="section"
          value={customField.section}
          onChange={handleChange}
          required
        />
        <input
          className="inputItems"
          type="text"
          name="label"
          value={customField.label}
          onChange={handleChange}
          required
        />
        <select
          className="inputItems"
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

export default AddCustomField;
