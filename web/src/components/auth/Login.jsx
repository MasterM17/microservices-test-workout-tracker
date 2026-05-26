import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIntoApp } from "./duck/operations";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logIn() {
    try {
      await dispatch(logIntoApp(loginData));
      navigate("/dashboard");
    } catch (err) {
      console.log("logIn error", err);
    }
  }

  return (
    <div id="login">
      <label>Email:</label> <br />
      <input
        type="text"
        placeholder="Enter email"
        value={loginData.email}
        onChange={(e) => {
          setLoginData({ ...loginData, email: e.target.value });
        }}
      />
      <br />
      <br />
      <label>Password:</label> <br />
      <input
        type="text"
        placeholder="Enter password"
        value={loginData.password}
        onChange={(e) => {
          setLoginData({ ...loginData, password: e.target.value });
        }}
      />
      <br />
      <button onClick={logIn}>LogIn</button>
    </div>
  );
};
