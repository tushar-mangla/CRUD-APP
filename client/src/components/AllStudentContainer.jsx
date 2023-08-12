import React from "react";
import { Link } from "react-router-dom";
import "../style/AllStudent.scss";
import actionIcon from "../images/actionIcon.svg";
import { RiDeleteBin5Line } from "react-icons/Ri";
const StudentContainer = ({
  students,
  currentPage,
  numOfPages,
  handlePageChange,
  handleDelete,
}) => {
  return (
    <div className="studentList">
      <table className="tableContainer">
        <thead>
          <tr className="tableHeader">
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Parents Name</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="listItems">{student.studentId}</td>
              <td className="listItems">{student.firstName}</td>
              <td className="listItems">{student.lastName}</td>
              <td className="listItems">
                {new Date(student.dob).toLocaleDateString()}
              </td>
              <td className="listItems">{student.studentClass}</td>
              <td className="listItems">{student.parentsName}</td>
              <td className="listItems">{student.address}</td>
              <td className="listItems">
                <Link
                  to={`/dashboard/students/${student._id}`}
                  state={{ studentDetails: student }}
                >
                  <img src={actionIcon} />
                </Link>
              </td>
              <td className="listItems">
                <RiDeleteBin5Line onClick={() => handleDelete(student._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: numOfPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentContainer;
