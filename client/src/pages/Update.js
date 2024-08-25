import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Update = () => {
  const { id } = useParams();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      axios
        .get(`http://localhost:5000/update/${id}`)
        .then((result) => {
          setFirstName(result.data.firstname);
          setLastName(result.data.lastname);
          setDepartment(result.data.department);
          console.log(result);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, []);

  const options = [
    { label: "Course" },
    { label: "BCA", value: "BCA" },
    { label: "BBA", value: "BBA" },
    { label: "BSC", value: "BSC" },
    { label: "BA", value: "BA" },
    { label: "MCA", value: "MCA" },
    { label: "MBA", value: "MBA" },
  ];

  const updateToast = () => {
    toast.success("Updated Successfully", { duration: 2000 });
  };

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/updatestudent/${id}`, {
        firstname,
        lastname,
        department,
      })
      .then((result) => {
        console.log(result);
        updateToast();
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="update-wrapper d-flex justify-content-center text-white vh-100">
      <div className="update-container d-flex p-4 rounded-5">
        <div className="p-1">
          <h2 className="mb-4 d-flex justify-content-center">Update</h2>

          {/* <p className="mb-5">Update your Details.</p> */}
          <form onSubmit={Update}>
            <div className="mb-3 ">
              <label className="mb-2" htmlFor="name">
                <strong>First Name: </strong>
              </label>
              <br />
              <input
                type="text"
                placeholder="First Name"
                autoComplete="off"
                name="name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="credential-field"
              />
            </div>
            <hr />

            <div className="mb-3">
              <label className="mb-2" htmlFor="name">
                <strong>Last Name:</strong>
              </label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="Last Name"
                autoComplete="off"
                name="name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="credential-field"
              />
            </div>
            <hr />

            <div className="mb-3 ">
              <label className="mb-2" htmlFor="name">
                <strong>Course: </strong>
              </label>
              <br />
              <select
                className="credential-field rounded-2 text-light"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {options.map((option) => (
                  <option className=" bg-dark text-light" value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* <p>{department}</p> */}
            </div>
            <hr />

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="mt-2 m-1 btn btn-dark w-50 rounded"
              >
                Update
              </button>
              <button
                onClick={goBack}
                className="mt-2 m-1  btn btn-dark w-50 rounded"
              >
                back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
