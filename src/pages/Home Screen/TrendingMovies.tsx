import React, { useState, useEffect, useRef, useContext } from "react";
import { useDebounce } from "../../customHooks/useDebounce";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";
import SearchBar from "./SearchBar";
import * as API from "../../restapi";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";

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
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);
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

  function calcMaxSectionCount(data: movieData[]): number {
    var count = Math.floor(data.length / 4);
    console.log(`count is: ${count}`);
    var remainder = data.length % 4;
    if (remainder > 0) count += 1;
    return count;
  }

  useEffect(() => {
    if (callOnce.current) return;
    API.tmdb_trendingMovies()
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        HomePageDispatch({ type: "get trending movies", trendingMovies: data.results });
      })
      .catch((err) => {
        console.log(err.message);
      });
    callOnce.current = true;
  }, []);

  useEffect(() => {
    if (!HomePageState.submitSearch) return;
    else HomePageDispatch({ type: "change submitSearch bool", submitSearch: false });
    API.tmdb_searchMovies(HomePageState.submittedSearch, HomePageState.currentPage)
      .then((res) => res.json())
      .then((data: apiResponse) => {
        console.log(data);
        // setSearchedMovies(data.results);
        HomePageDispatch({
          type: "get searched movies",
          searchedMovies: data.results,
          maxSearchedSectionCount: calcMaxSectionCount(data.results),
          totalPageForMovieSearched: data.total_pages,
        });
        console.log(`HomePageState.searchedMovies length is: ${HomePageState.searchedMovies}`);
        // setMaxSearchedSectionCount(() => {
        //   var count = Math.floor(data.results.length / 4);
        //   console.log(`count is: ${count}`);
        //   var remainder = data.results.length % 4;
        //   if (remainder > 0) count += 1;
        //   return count;
        // });
        // console.log(`max section count is: ${maxSearchedSectionCount}`);
        // setTotalPageForMovieSearched(data.total_pages);
        // console.log(`searchedMovies length is: ${searchedMovies.length}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [HomePageState.submitSearch]);

  return (
    <>
      <SMainDiv>
        <p>Trending Movies</p>
        <SH1WrapperDiv>
          <SH1>I want to show trending movies here.</SH1>
        </SH1WrapperDiv>
        {HomePageState.trendingMovies.length !== 0 && (
          <MoviesMap
            movies={HomePageState.trendingMovies}
            sectionType={"trending"}
            sectionCount={HomePageState.sectionCount}
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
        {HomePageState.submitSearch && HomePageState.searchedMovies.length === 0 && (
          <p>No movies found for '{HomePageState.submittedSearch}'</p>
        )}
        {HomePageState.searchedMovies.length !== 0 && (
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
