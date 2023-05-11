import React from "react";
// import "./App.css";
import { Outlet } from "react-router-dom";
import UserAccessProvider from "./context/UserAccess/UserAccessProvider";
import { Navbar } from "./component";

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
