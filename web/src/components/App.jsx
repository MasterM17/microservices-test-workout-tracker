import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export function App() {
  return (
    <div id="app">
      <nav>
        <Nav></Nav>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
