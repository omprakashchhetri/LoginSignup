import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../Assects/mind-map.gif";

const Home = () => {
  const navigate = useNavigate();
  const signup = () => {
    return navigate("/signup");
  };
  const login = () => {
    return navigate("/login");
  };
  const dashBoard = () => {
    return navigate("/dashboard");
  };

  const auth = localStorage.getItem("authtoken");

  return (
    <>
      <div className="home vh-100">
        <div className="d-flex flex-column ">
          <div className=" d-flex justify-content-center w-100">
            <div className="navbar w-50 mt-4 table-wrapper rounded-4">
              <div className="p-1 ">
                <h3 className=" fw-bold text-white mx-4 mt-2">Home</h3>
              </div>
              {auth ? (
                <div className="">
                  <button
                    onClick={dashBoard}
                    className=" btn btn-light p-2 px-4 m-1 rounded-4"
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <div className="">
                  <button
                    onClick={login}
                    className=" btn btn-outline-light  p-2 px-4 m-2 rounded-4 "
                  >
                    Login
                  </button>
                  <button
                    onClick={signup}
                    className=" btn btn-light p-2 px-4 m-1 rounded-4"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center pt-5">
            <img className="vector " src={Image} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
