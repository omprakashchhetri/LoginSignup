import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signupValidation } from "./SignupValidation";
import { toast } from "sonner";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, []);
  const signupToast = () => {
    toast.success("Registered !", { duration: 2000 });
  };
  const userToast = () => {
    toast.warning("User Exist!", { duration: 2000 });
  };
  const passwordToast = () => {
    toast.error("Password not match", { duration: 2000 });
  };

  const options = [
    { label: "Course" },
    { label: "BCA", value: "BCA" },
    { label: "BBA", value: "BBA" },
    { label: "BSC", value: "BSC" },
    { label: "BA", value: "BA" },
    { label: "MCA", value: "MCA" },
    { label: "MBA", value: "MBA" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      passwordToast();
      return;
    }
    axios
      .post("http://localhost:5000/signup", {
        firstname,
        lastname,
        email,
        password,
        department,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          signupToast();
          navigate("/login");
        } else if (result.data) userToast();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-wrapper d-flex justify-content-center align-items-center text-white vh-100">
      <div className="signup-container d-flex p-4 rounded-5">
        <div className="position p-1">
          <h2 className=" mb-1">SignUp</h2>
          <p className="mb-5">Please create your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="name">
                <strong>First Name:</strong>
              </label> */}
              <input
                type="text"
                placeholder="First Name"
                autoComplete="off"
                name="name"
                className="credential-field"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {signupValidation.firstname && (
              <small>{signupValidation.firstname}</small>
            )}
            <div className="mb-3">
              {/* <label htmlFor="name">
                <strong>Last Name:</strong>
              </label> */}
              <input
                type="text"
                placeholder="Last Name"
                autoComplete="off"
                name="name"
                required
                className="credential-field"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3 mx-auto">
              <select
                className="credential-field rounded-2 text-light"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {options.map((option) => (
                  <option className=" bg-light text-dark" value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* <p>{department}</p> */}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="email">
                <strong>Email:</strong>
              </label> */}
              <input
                type="email"
                placeholder="yourmail@gmail.com"
                autoComplete="off"
                name="email"
                required
                className="credential-field"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password">
                <strong>Password:</strong>
              </label> */}
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={password}
                required
                className="credential-field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password">
                <strong>Password:</strong>
              </label> */}
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                name="password"
                value={confirmPassword}
                required
                className="credential-field"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className=" mt-2 btn btn-light w-50 rounded"
              >
                Register
              </button>
            </div>
          </form>
          <p className="create-account">
            Already have an account?{" "}
            <Link className="text-light" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
