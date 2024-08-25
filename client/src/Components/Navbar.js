import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutToast = () => {
    toast.success("Logged Out!", { duration: 2000 });
  };

  const logout = () => {
    axios
      .post("http://localhost:5000/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        logoutToast();
        localStorage.removeItem("token");
        localStorage.removeItem("authtoken");

        return navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex  justify-content-center">
      <div className="navbar w-50 mt-4 table-wrapper rounded-4">
        <div className="d-flex p-1 justify-content-center align-items-center">
          <h3 className=" fw-bold text-white mx-4 mt-2">Dashboard</h3>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <Link to="/" className=" text-white text-decoration-none mx-4 p-2  ">
            Home
          </Link>

          <button
            className=" btn btn-light p-2 px-4 m-2 rounded-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
