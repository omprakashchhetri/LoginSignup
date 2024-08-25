import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import DisplayStudent from "./DisplayStudent";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [loading, setLoading] = useState(true);

  const tokenToast = () => {
    toast.error("Token Expired!", { duration: 2000 });
  };

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      axios
        .get("http://localhost:5000/dashboard", {
          withCredentials: true,
        })
        .then((response) => {
          if (
            response.data === "Token Not Found!" ||
            response.data === "Token is Invalid!"
          ) {
            // Token is expired or invalid, redirect to login page
            tokenToast();
            navigate("/login");
          } else {
            // Token is valid, continue with the dashboard page
            axios
              .get("http://localhost:5000/dashboard", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              })
              .then((userDataResponse) => {
                setUserData(userDataResponse.data);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dashboard-wrapper vh-100">
        {loading ? (
          <div className="d-flex vh-100 justify-content-center align-items-center ">
            <SyncLoader size={10} color="#d4cfcf" />
          </div>
        ) : (
          <div className="">
            <Navbar />
            <div className="w-100  d-flex justify-content-center ">
              <h3 className=" w-50  text-decoration-underline mt-5 mb-3 text-white fs-4 text fw-bold  d-flex justify-content-center">
                Welcome, {userData.firstName} {userData.lastName} !
              </h3>
            </div>
            <DisplayStudent />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
