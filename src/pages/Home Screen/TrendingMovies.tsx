import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../customHooks/useDebounce";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";
import SearchBar from "./SearchBar";
import * as API from "../../restapi";
import styled from "styled-components";

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const SH1WrapperDiv = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SH1 = styled.h1`
  margin: 0;
`;

export type apiResponse = {
  page: string;
  results: movieData[];
  total_pages: number;
  total_results: number;
};

export type movieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const TrendingMovies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<movieData[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<movieData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [prevSubmittedSearch, setPrevSubmittedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageForMovieSearched, setTotalPageForMovieSearched] = useState(0);
  const [submitSearch, setSubmitSearch] = useState(false);
  // const debouncedSearch = useDebounce(searchText, 2000);
  const [sectionCount, setSectionCount] = useState(1);
  const [searchedSectionCount, setSearchedSectionCount] = useState(1);
  const [maxSearchedSectionCount, setMaxSearchedSectionCount] = useState(1);
  const callOnce = useRef<boolean>(false);

  useEffect(() => {
    if (callOnce.current) return;
    API.tmdb_trendingMovies()
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        setTrendingMovies(data.results);
        console.log(`trendingMovies length is: ${trendingMovies.length}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
    callOnce.current = true;
  }, []);

  useEffect(() => {
    if (!submitSearch) return;
    else setSubmitSearch(false);
    API.tmdb_searchMovies(submittedSearch, currentPage)
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        setSearchedMovies(data.results);
        setMaxSearchedSectionCount(() => {
          var count = Math.floor(data.results.length / 4);
          console.log(`count is: ${count}`);
          var remainder = data.results.length % 4;
          if (remainder > 0) count += 1;
          return count;
        });
        console.log(`max section count is: ${maxSearchedSectionCount}`);
        setTotalPageForMovieSearched(data.total_pages);
        console.log(`searchedMovies length is: ${searchedMovies.length}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [submitSearch, setSubmitSearch]);

  return (
    <>
      <SMainDiv>
        <p>Trending Movies</p>
        <SH1WrapperDiv>
          <SH1>I want to show trending movies here.</SH1>
        </SH1WrapperDiv>
        {trendingMovies.length !== 0 && (
          <MoviesMap
            movies={trendingMovies}
            sectionCount={sectionCount}
            setSectionCount={setSectionCount}
          />
        )}
        <SearchBar
          setSubmitSearch={setSubmitSearch}
          setSearchText={setSearchText}
          searchText={searchText}
          setSubmittedSearch={setSubmittedSearch}
          submittedSearch={submittedSearch}
          prevSubmittedSearch={prevSubmittedSearch}
          setPrevSubmittedSearch={setPrevSubmittedSearch}
          setCurrentPage={setCurrentPage}
          setSearchedSectionCount={setSearchedSectionCount}
        />
        {submitSearch && searchedMovies.length === 0 && (
          <p>No movies found for '{submittedSearch}'</p>
        )}
        {searchedMovies.length !== 0 && (
          <SearchedMovies
            searchedMovies={searchedMovies}
            searchedSectionCount={searchedSectionCount}
            setSearchedSectionCount={setSearchedSectionCount}
            maxSearchedSectionCount={maxSearchedSectionCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageForMovieSearched={totalPageForMovieSearched}
            setSubmitSearch={setSubmitSearch}
          />
        )}
      </SMainDiv>
    </>
  );
};
