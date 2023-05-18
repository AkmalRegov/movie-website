import React, { useEffect, useState } from "react";
import HomePageProvider from "../../context/HomePage/HomePageProvider";
import { TrendingMovies } from "./TrendingMovies";
import RatingModal from "../../component/RatingModal";

const HomeScreen: React.FC = () => {
  return (
    <>
      <HomePageProvider>
        <TrendingMovies />
      </HomePageProvider>
      {/* <RatingModal /> */}
    </>
  );
};

export default HomeScreen;
