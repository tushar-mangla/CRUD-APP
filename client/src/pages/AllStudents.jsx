import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import StudentContainer from "../components/AllStudentContainer";

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
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Students</h2>
        <Link to="/dashboard/addStudent" className="btn btn-primary">
          Add Student
        </Link>
      </div>
      <StudentContainer
        students={students}
        currentPage={currentPage}
        numOfPages={totalPages}
        handlePageChange={handlePageChange}
        handleDelete={handleDelete}
      />
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
