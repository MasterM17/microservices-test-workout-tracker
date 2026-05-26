import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./auth/duck/operations";

export const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authReducer);
  const authState = useSelector((state) => state.authReducer);
  console.log("Nav Auth State Check:", authState);

  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/login");
  };

  return (
    <ul id="nav">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {token ? (
        // 3. Conditional rendering: Only show these if logged in
        <>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </>
      ) : (
        // 4. Show these if logged out
        <>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </>
      )}
    </ul>
  );
};
