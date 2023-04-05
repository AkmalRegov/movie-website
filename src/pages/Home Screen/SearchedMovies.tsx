import React, { useEffect } from "react";
import { movieData } from "./TrendingMovies";
import MoviesMap from "./MoviesMap";

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
          top: document.documentElement.scrollHeight - 760,
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  return (
    <>
      <h2
        style={{
          display: "flex",
          margin: 0,
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Searched movies
      </h2>
      <MoviesMap
        movies={searchedMovies}
        sectionCount={searchedSectionCount}
        setSectionCount={setSearchedSectionCount}
        maxSectionCount={maxSearchedSectionCount}
      />
      <div
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
      </div>
      <div style={{ marginTop: "8rem" }}></div>
    </>
  );
};

export default SearchedMovies;
