import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StudentContainer from "../components/AllStudentContainer";
import plus from "../images/plus.svg";
import edit from "../images/edit.svg";
import search from "../images/search.svg";
import "../style/AllStudent.scss";
const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStudents = async (page) => {
    try {
      const { data } = await customFetch.get(`/students/?page=${page}`);
      setStudents(data.students);
      setTotalPages(data.numOfPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchStudents(page);
  };

  const handleDelete = async (studentId) => {
    try {
      await customFetch.delete(`/students/${studentId}`);
      fetchStudents(currentPage);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="addNewStudentContainer">
      <div className="rightSide">
        <div className="studentListContainer">
          <div className="topbar">
            <div className="search">
              <img className="image" src={search} />
              <input
                className="input"
                placeholder="Search for Students..."
                // onChange={Filter}
              />
            </div>
            <div className="rightBtn">
              <Link className="edit">
                <img className="image " src={edit} />
                <p className="para">Edit Student Details</p>
              </Link>
              <Link to="/dashboard/addStudent" className="addNew">
                <img className="image " src={plus} />
                <p className="para">Add New</p>
              </Link>
            </div>
          </div>
          <StudentContainer
            students={students}
            currentPage={currentPage}
            numOfPages={totalPages}
            handlePageChange={handlePageChange}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStudents;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import customFetch from "../utils/customFetch";
// import StudentContainer from "../components/AllStudentContainer";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchStudents = async (page) => {
//     try {
//       const { data } = await customFetch.get(`/students/?page=${page}`);
//       setStudents(data.students);
//       setTotalPages(data.numOfPages);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     fetchStudents(page);
//   };

//   const handleDelete = async (studentId) => {
//     try {
//       await customFetch.delete(`/students/${studentId}`);
//       fetchStudents(currentPage);
//     } catch (error) {
//       console.error("Error deleting student:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>All Students</h2>
//       <button onClick={() => navigate("/dashboard/students/add")}>
//         Add Student
//       </button>
//       <StudentContainer
//         students={students}
//         currentPage={currentPage}
//         numOfPages={totalPages}
//         handlePageChange={handlePageChange}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default AllStudents;
