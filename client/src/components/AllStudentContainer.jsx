import React from "react";
import { Link } from "react-router-dom";

const StudentContainer = ({
  students,
  currentPage,
  numOfPages,
  handlePageChange,
  handleDelete,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Parents Name</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.studentClass}</td>
              <td>{student.parentsName}</td>
              <td>{student.address}</td>
              <td>
                <Link
                  to={`/dashboard/students/${student._id}`}
                  state={{ studentDetails: student }}
                >
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
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
