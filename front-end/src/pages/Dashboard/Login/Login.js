import React, { useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
  .post("http://localhost:4000/auth/login", {
    email: login.email,
    password: login.password,
  })
  .then((resp) => {
    setLogin({ ...login, loading: false, err: [] });
    const { type, id } = resp.data; // get the type and id from the response
    localStorage.setItem('id', id); // store the id in local storage
    if (type === 1) {
      window.location.href = "/AdminDashboard";
    } else if (type === 0) {
      window.location.href = "/BookList";
    }
  })
  .catch((errors) => {
    setLogin({
      ...login,
      loading: false,
      err: errors.response.data.errors,
    });
  });

  };

  return (
   <div>
     <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>

        {login.err.map((error, index) => (
          <div key={index} className="error">
            {error.msg}
          </div>
        ))}

        <form onSubmit={LoginFun}>
          <input
            type="email"
            placeholder="Email"
            required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />

          <button type="submit" disabled={login.loading === true}>
            Login
          </button>
        </form>
        <div className="register-link">
          Don't have an account?{" "}
          <Link to={"/Register"} className="link">
            Register here
          </Link>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Login;
