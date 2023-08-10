// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import customFetch from "../utils/customFetch";

// const EditStudent = () => {
//   const { studentId } = useParams();
//   const navigate = useNavigate();

//   const [student, setStudent] = useState({
//     studentId: "",
//     firstName: "",
//     lastName: "",
//     dob: "",
//     studentClass: "",
//     gender: "",
//     parentsName: "",
//     address: "",
//     details: "",
//   });

//   const formatDate = (date) => {
//     const dateObject = new Date(date);
//     const day = String(dateObject.getDate()).padStart(2, "0");
//     const month = String(dateObject.getMonth() + 1).padStart(2, "0");
//     const year = dateObject.getFullYear();

//     const formattedDate = `${year}-${month}-${day}`;
//     return formattedDate;
//   };

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const { data } = await customFetch.get(`/students/${studentId}`);
//         const formattedDob = formatDate(data.student.dob);
//         setStudent({
//           ...data.student,
//           dob: formattedDob,
//         });
//       } catch (error) {
//         console.error("Error fetching student details:", error);
//       }
//     };

//     fetchStudentDetails();
//   }, [studentId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setStudent((prevStudent) => ({
//       ...prevStudent,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await customFetch.patch(`/students/${studentId}`, student);
//       navigate("/dashboard/students"); // Redirect back to the all students page
//     } catch (error) {
//       console.error("Error updating student:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Student</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Displaying Student Information */}
//         <div>
//           <label htmlFor="studentId">Student ID:</label>
//           <input
//             type="text"
//             id="studentId"
//             name="studentId"
//             value={student.studentId}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={student.firstName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={student.lastName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="dob">Date of Birth:</label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={student.dob}
//             onChange={handleInputChange}
//             max={new Date().toISOString().split("T")[0]}
//           />
//         </div>
//         <div>
//           <label htmlFor="studentClass">Class:</label>
//           <input
//             type="text"
//             id="studentClass"
//             name="studentClass"
//             value={student.studentClass}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="gender">Gender:</label>
//           <select
//             id="gender"
//             name="gender"
//             value={student.gender}
//             onChange={handleInputChange}
//           >
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="parentsName">Parents Name:</label>
//           <input
//             type="text"
//             id="parentsName"
//             name="parentsName"
//             value={student.parentsName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={student.address}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="details">Details:</label>
//           <textarea
//             id="details"
//             name="details"
//             value={student.details}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <button type="submit">Save Changes</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import CustomFieldsForm from "../components/CustomFieldsForm";
import { OrganizeCustomFields } from "../components";

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    dob: "",
    studentClass: "",
    gender: "",
    parentsName: "",
    address: "",
    details: "",
  });
  const [customFieldsData, setCustomFieldsData] = useState([]);
  const [customFields, setCustomFields] = useState({});

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = dateObject.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const { data } = await customFetch.get(`/students/${studentId}`);
        const formattedDob = formatDate(data.student.dob);
        setStudent({
          ...data.student,
          dob: formattedDob,
        });
        setCustomFields(data.student.customFields || {});
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
    fetchCustomFields();
  }, [studentId]);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleCustomFieldChange = (customFieldId, value) => {
    setCustomFields((prevFields) => ({
      ...prevFields,
      [customFieldId]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedStudentData = {
        ...student,
        customFields: customFields,
      };

      await customFetch.patch(`/students/${studentId}`, updatedStudentData);
      navigate("/dashboard/students"); // Redirect back to the all students page
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        {/* Displaying Student Information */}
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={student.studentId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={student.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={student.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={student.dob}
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="studentClass">Class:</label>
          <input
            type="text"
            id="studentClass"
            name="studentClass"
            value={student.studentClass}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={student.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="parentsName">Parents Name:</label>
          <input
            type="text"
            id="parentsName"
            name="parentsName"
            value={student.parentsName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={student.details}
            onChange={handleInputChange}
          />
        </div>
        {customFieldsData && (
          <CustomFieldsForm
            customFieldsData={customFieldsData}
            customFields={customFields}
            handleCustomFieldChange={handleCustomFieldChange}
          />
        )}
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
