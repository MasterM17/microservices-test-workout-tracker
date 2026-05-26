import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import store from "./store.jsx";
import { Login } from "./components/auth/Login.jsx";
import { Dashboard } from "./components/dashboard/index.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" index element={<Login></Login>}></Route>
        <Route path="/" element={<App></App>}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>
      </Routes>
    </Router>
  </Provider>,
);
