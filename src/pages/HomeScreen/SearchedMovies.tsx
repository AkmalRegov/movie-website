import React, { useEffect, useRef, useContext } from "react";
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

const SPageButton = styled.button`
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const SearchedMovies: React.FC = ({}) => {
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);
  const searchedMoviesH2Section = useRef() as React.MutableRefObject<HTMLHeadingElement>;
  function sectionChangeHandler() {
    HomePageDispatch({ type: "set searchedSectionCount number", searchedSectionCount: 1 });
    HomePageDispatch({ type: "change submitSearch bool", submitSearch: true });
  }
  function handlePrevious() {
    if (HomePageState.currentPage === 1) return;
    HomePageDispatch({
      type: "set currentPage number",
      currentPage: HomePageState.currentPage - 1,
    });
    sectionChangeHandler();
  }

  function handleNext() {
    if (HomePageState.currentPage === HomePageState.totalPageForMovieSearched) return;
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
        <SPageButton
          onClick={handlePrevious}
          disabled={HomePageState.currentPage === 1 ? true : false}
        >
          Previous Page
        </SPageButton>
        <p style={{ color: "black" }}>
          {HomePageState.currentPage}/{HomePageState.totalPageForMovieSearched}
        </p>
        <SPageButton
          onClick={handleNext}
          disabled={
            HomePageState.currentPage === HomePageState.totalPageForMovieSearched ? true : false
          }
        >
          Next Page
        </SPageButton>
      </SButtonWrapperDiv>
      <SEmptyBoxDiv></SEmptyBoxDiv>
    </>
  );
};

export default SearchedMovies;
