import React, { useEffect, useRef } from "react";
import { movieData } from "./TrendingMovies";
import MoviesMap from "./MoviesMap";
import styled from "styled-components";

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
  const searchedMoviesH2Section = useRef() as React.MutableRefObject<HTMLHeadingElement>;
  function handlePrevious() {
    if (currentPage === 1) return;
    setCurrentPage(() => {
      return currentPage - 1;
    });
    setSearchedSectionCount(1);
    setSubmitSearch(true);
  }

  function handleNext() {
    if (currentPage === totalPageForMovieSearched) return;
    setCurrentPage(() => {
      return currentPage + 1;
    });
    setSearchedSectionCount(1);
    setSubmitSearch(true);
  }

  useEffect(() => {
    if (searchedMovies.length != 0) {
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
        movies={searchedMovies}
        sectionCount={searchedSectionCount}
        setSectionCount={setSearchedSectionCount}
        maxSectionCount={maxSearchedSectionCount}
      />
      <SButtonWrapperDiv
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <button onClick={handlePrevious}>Previous Page</button>
        <p>
          {currentPage}/{totalPageForMovieSearched}
        </p>
        <button onClick={handleNext}>Next Page</button>
      </SButtonWrapperDiv>
      <SEmptyBoxDiv style={{ marginTop: "8rem" }}></SEmptyBoxDiv>
    </>
  );
};

export default SearchedMovies;
