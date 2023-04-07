import React, { Fragment } from "react";
import logo from "./logo.svg";
// import "./App.css";
import { TrendingMovies } from "./pages/Home Screen/TrendingMovies";
import HomePageProvider from "./context/HomePage/HomePageProvider";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
      </div>
      <div>
        <HomePageProvider>
          <TrendingMovies />
        </HomePageProvider>
      </div>
    </>
  );
}

export default App;
