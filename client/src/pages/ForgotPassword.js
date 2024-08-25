import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    toast.success("OTP Sent", { duration: 2000 });
    navigate("/login");
  };

  return (
    <div className="login-wrapper d-flex justify-content-center text-white vh-100">
      <div className="login-container d-flex p-4 rounded-5">
        <div className="position p-1">
          <h2 className="mb-1">Reset Password</h2>
          <p className="mb-5">
            Please enter your email to Reset your Password.
          </p>
          <form onSubmit={handleSubmit}>
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
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className=" mt-2 btn btn-light rounded w-50"
              >
                Send
              </button>
            </div>
          </form>
          <p className="reset">
            <Link className="text-light" to="/signup">
              SignUp
            </Link>
            <span> | </span>
            <Link className="text-light" to="/login">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
