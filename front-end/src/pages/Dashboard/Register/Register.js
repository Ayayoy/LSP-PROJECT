import React, { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../helper/storage";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    loading: false,
    err: [],
  });

  const [successMessage, setSuccessMessage] = useState("");

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
        phone: register.phone,
      })
      .then((resp) => {
        setSuccessMessage("Registration done, please wait for approval.");
        setRegister({ email: "", password: "", name: "", phone: "", loading: false, err: [] });
        setAuthUser(resp.data);
        // console.log(resp.data.msg);
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-form">
          <h1>Register</h1>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {register.err.map((error, index) => (
            <div key={index} className="error-message">
              {error.msg}
            </div>
          ))}

          <form onSubmit={RegisterFun}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={register.name}
                onChange={(e) =>
                  setRegister({ ...register, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={register.password}
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Phone number"
                value={register.phone}
                onChange={(e) =>
                  setRegister({ ...register, phone: e.target.value })
                }
              />
            </div>

            <button type="submit" disabled={register.loading}>
              {register.loading ? "Loading..." : "Register"}
            </button>
          </form>

          <div className="login-link">
            Already have an account?{" "}
            <Link to={"/Login"} className="link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
