import React, { useEffect, useRef, useContext } from "react";
import { movieData } from "./TrendingMovies";
import MoviesMap from "./MoviesMap";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";

const SH2 = styled.h2`
  display: flex;
  margin: 0;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SButtonWrapperDiv = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SEmptyBoxDiv = styled.div`
  margin-top: 8rem;
`;

type SearchedMoviesProps = {
  searchedMovies: movieData[];
  searchedSectionCount: number;
  setSearchedSectionCount: React.Dispatch<React.SetStateAction<number>>;
  maxSearchedSectionCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPageForMovieSearched: number;
  setSubmitSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchedMovies: React.FC<SearchedMoviesProps> = ({
  searchedMovies,
  searchedSectionCount,
  setSearchedSectionCount,
  maxSearchedSectionCount,
  currentPage,
  setCurrentPage,
  totalPageForMovieSearched,
  setSubmitSearch,
}) => {
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);
  const searchedMoviesH2Section = useRef() as React.MutableRefObject<HTMLHeadingElement>;
  function sectionChangeHandler() {
    setSearchedSectionCount(1);
    setSubmitSearch(true);
    HomePageDispatch({ type: "set searchedSectionCount number", searchedSectionCount: 1 });
    HomePageDispatch({ type: "change submitSearch bool", submitSearch: true });
  }
  function handlePrevious() {
    if (currentPage === 1) return;
    setCurrentPage(() => {
      return currentPage - 1;
    });
    HomePageDispatch({
      type: "set currentPage number",
      currentPage: HomePageState.currentPage - 1,
    });
    sectionChangeHandler();
  }

  function handleNext() {
    if (currentPage === totalPageForMovieSearched) return;
    setCurrentPage(() => {
      return currentPage + 1;
    });
    HomePageDispatch({
      type: "set currentPage number",
      currentPage: HomePageState.currentPage + 1,
    });
    sectionChangeHandler();
  }

  useEffect(() => {
    if (HomePageState.searchedMovies.length != 0) {
      setTimeout(() => {
        window.scrollTo({
          top: searchedMoviesH2Section.current.offsetTop,
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  return (
    <>
      <SH2 ref={searchedMoviesH2Section}>Searched movies</SH2>
      <MoviesMap
        movies={HomePageState.searchedMovies}
        sectionType={"searched"}
        sectionCount={HomePageState.searchedSectionCount}
        maxSectionCount={HomePageState.maxSearchedSectionCount}
      />
      <SButtonWrapperDiv>
        <button onClick={handlePrevious}>Previous Page</button>
        <p>
          {HomePageState.currentPage}/{HomePageState.totalPageForMovieSearched}
        </p>
        <button onClick={handleNext}>Next Page</button>
      </SButtonWrapperDiv>
      <SEmptyBoxDiv></SEmptyBoxDiv>
    </>
  );
};

export default SearchedMovies;
