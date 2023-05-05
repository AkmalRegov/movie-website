import React from "react";
// import "./App.css";
import Navbar from "./component/Navbar";
import { Outlet } from "react-router-dom";
import UserAccessProvider from "./context/UserAccess/UserAccessProvider";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
      </div>
      <Navbar />
      <UserAccessProvider>
        <Outlet />
      </UserAccessProvider>
    </>
  );
}

export default App;
