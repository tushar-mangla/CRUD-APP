import { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";
import CustomFieldsForm from "../components/CustomFieldsForm";
import "../style/AddStudent.scss";
import { OrganizeCustomFields } from "../components";
import iconUser from "../images/iconUser.svg";
import avatar from "../images/avatar.svg";
import location from "../images/location.svg";

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
    <div className="addNewStudentContainer">
      <div className="rightSide">
        <form className="addStudent" onSubmit={handleSubmit}>
          <img className="image" src={avatar} />
          <div className="nameSection">
            <div>
              <p>FirstName</p>
              {/* <label htmlFor="firstName">First Name</label> */}
              <div className="formRow">
                <input
                  className="formInput"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <img className="inputImage" src={iconUser} />
              </div>
            </div>
            <div>
              {/* <label htmlFor="lastName">Last Name</label> */}
              <p>Last Name</p>
              <div className="formRow">
                <input
                  className="formInput"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <img className="inputImage" src={iconUser} />
              </div>
            </div>
          </div>

          <div className="nameSection">
            <div>
              <p>ID</p>
              <div className="formRow">
                {/* <label htmlFor="studentId">Student ID:</label> */}
                <input
                  className="formInput"
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <p>Date of Birth</p>
              {/* <label htmlFor="dob">Date of Birth:</label> */}
              <div className="formRow">
                <input
                  className="formInput"
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
          <div className="nameSection">
            <div>
              <p>Class</p>
              {/* <label htmlFor="studentClass">Class:</label> */}
              <div className="formRow">
                <input
                  className="formInput"
                  type="text"
                  id="studentClass"
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <label htmlFor="gender">Gender:</label> */}
            <div>
              <p>Gender</p>
              <div className="formRow">
                <select
                  className="formInput"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="nameSection">
            <div>
              <p>Parent's Name</p>
              {/* <label htmlFor="parentsName">Parents Name:</label> */}
              <div className="formRow">
                <input
                  className="formInput"
                  type="text"
                  id="parentsName"
                  name="parentsName"
                  value={formData.parentsName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <p>Address</p>
              {/* <label htmlFor="address">Address:</label> */}
              <div className="formRow">
                <input
                  className="formInput"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="details">
            <p>Details</p>
            {/* <label htmlFor="details">Details:</label> */}
            <textarea
              className="detailsInput"
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
          </div>

          {customFieldsData && (
            <CustomFieldsForm
              customFieldsData={customFieldsData}
              customFields={customFields}
              handleCustomFieldChange={handleCustomFieldChange}
            />
          )}

          <div className="buttonContainer">
            <button className="button" type="submit">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
