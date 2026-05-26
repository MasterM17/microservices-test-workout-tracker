import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Nav = () => {
  const dispatch = useDispatch();
  return (
    <ul id="nav">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
        </ul>
  );
};
