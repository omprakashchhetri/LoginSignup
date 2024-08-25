import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";
import DeleteModal from "../Components/DeleteModal";

const DisplayStudent = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const CloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getstudent")
      .then((student) => setStudents(student.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteToast = () => {
    toast.success("Deleted!", { duration: 2000 });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deletestudent/${id}`)
      .then((result) => {
        console.log(result);
        deleteToast();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="w-50 table-wrapper rounded-4 p-3">
        <h4 className="text-white fs-5">List of Students:</h4>
        <hr className="text-secondary m-1" />
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Course </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>
                    <Link
                      to={`/update/${student._id}`}
                      className="btn btn-light m-1"
                      title="Edit"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      className="btn btn-danger m-1"
                      title="Delete"
                      onClick={(e) => setShowModal(true)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                    {showModal && (
                      <DeleteModal
                        CloseModal={CloseModal}
                        onDelete={() => handleDelete(student._id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStudent;
