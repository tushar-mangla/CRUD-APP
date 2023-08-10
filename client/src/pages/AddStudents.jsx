import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import CustomFieldsForm from "../components/CustomFieldsForm";
import "../css/AddStudent.css";
import { OrganizeCustomFields } from "../components";

const AddStudent = () => {
  const navigate = useNavigate();
  const [customFieldsData, setCustomFieldsData] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    dob: "",
    studentClass: "",
    gender: "male",
    parentsName: "",
    address: "",
    details: "",
  });

  useEffect(() => {
    fetchCustomFields();
  }, []);

  const fetchCustomFields = async () => {
    try {
      const response = await customFetch.get("/custom");
      if (response.data) {
        const organizedData = OrganizeCustomFields(response.data);
        setCustomFieldsData(organizedData);
      } else {
        console.error("Error fetching custom fields: Invalid data");
      }
    } catch (error) {
      console.error("Error fetching custom fields:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gender" ? value : value.trim(),
    }));
  };

  const [customFields, setCustomFields] = useState({});

  const handleCustomFieldChange = (customFieldId, value, type) => {
    const fieldValue =
      type === "checkbox" ? (value === true ? value : false) : value;
    setCustomFields((prevFields) => ({
      ...prevFields,
      [customFieldId]: fieldValue,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        studentClass: formData.studentClass,
        gender: formData.gender,
        parentsName: formData.parentsName,
        address: formData.address,
        details: formData.details,
        customFields: customFields,
      };

      await customFetch.post("/students", studentData);
      navigate("/dashboard/students");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
        />

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor="studentClass">Class:</label>
        <input
          type="text"
          id="studentClass"
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="parentsName">Parents Name:</label>
        <input
          type="text"
          id="parentsName"
          name="parentsName"
          value={formData.parentsName}
          onChange={handleChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleChange}
        />

        {customFieldsData && (
          <CustomFieldsForm
            customFieldsData={customFieldsData}
            customFields={customFields}
            handleCustomFieldChange={handleCustomFieldChange}
          />
        )}

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
