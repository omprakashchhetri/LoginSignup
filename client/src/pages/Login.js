import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginToast = () => {
    toast.success("Logged In!", { duration: 2000 });
  };

  // const userToast = () => {
  //   toast.warning("User Not Found", { duration: 2000 });
  // };
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem("authtoken", response.data);
          loginToast();
          navigate("/dashboard");
        }
        // else if (response.data === "User Not Found!") userToast();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center text-white vh-100">
      <div className="login-container d-flex p-4 rounded-5">
        <div className="position p-1">
          <h2 className="mb-1">Login</h2>
          <p className="mb-5">Welcome back please login to your account.</p>
          <form onSubmit={handleSubmit} autocomplete="off">
            <div className="mb-3">
              {/* <label htmlFor="email">
              <strong>Email:</strong>
            </label> */}
              <input
                type="email"
                placeholder="Email"
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
                required
                name="password"
                className="credential-field"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>
              <Link className="text-light" to="/forgotpassword">
                Forgot Password?
              </Link>
            </p>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className=" mt-2 btn btn-light rounded w-50"
              >
                Login
              </button>
            </div>
          </form>
          <p className="login-account">
            Don't have an account?{" "}
            <Link className="text-light" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
