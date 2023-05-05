import React from "react";
import HomePageProvider from "../../context/HomePage/HomePageProvider";
import { TrendingMovies } from "./TrendingMovies";

const HomeScreen: React.FC = () => {
  return (
    <>
      <HomePageProvider>
        <TrendingMovies />
      </HomePageProvider>
    </>
  );
};

export default HomeScreen;
