import React from "react";
// import "./App.css";
import { Outlet } from "react-router-dom";
import UserAccessProvider from "./context/UserAccess/UserAccessProvider";
import { Navbar } from "./component";
import UserDetailsProvider from "./context/UserDetails/UserDetailsProvider";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
      </div>
      <UserAccessProvider>
        <UserDetailsProvider>
          <Navbar />
          <Outlet />
        </UserDetailsProvider>
      </UserAccessProvider>
    </>
  );
}

export default App;
