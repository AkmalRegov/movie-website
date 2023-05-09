import React, { useEffect, useRef, useContext } from "react";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";
import SearchBar from "./SearchBar";
import { SEARCH_MOVIES } from "../../restapi";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";
import { useLoaderData } from "react-router-dom";

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

//Simplifications
type apiResponse = SEARCH_MOVIES.apiResponse;
type movieData = SEARCH_MOVIES.movieData;
const { tmdb_searchMovies } = SEARCH_MOVIES;

type RouteLoaderData = {
  data: apiResponse;
};

export const TrendingMovies: React.FC = () => {
  const { state: HomePageState, dispatch: HomePageDispatch } = useContext(HomePageContext);
  const { data } = useLoaderData() as RouteLoaderData;
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
    HomePageDispatch({ type: "get trending movies", trendingMovies: data.results });
    callOnce.current = true;
  }, []);

  useEffect(() => {
    if (!HomePageState.submitSearch) return;
    else HomePageDispatch({ type: "change submitSearch bool", submitSearch: false });
    tmdb_searchMovies(HomePageState.submittedSearch, HomePageState.currentPage)
      .then((res) => res.json())
      .then((data: apiResponse) => {
        HomePageDispatch({
          type: "get searched movies",
          searchedMovies: data.results,
          maxSearchedSectionCount: calcMaxSectionCount(data.results),
          totalPageForMovieSearched: data.total_pages,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [HomePageState.submitSearch]);

  return (
    <>
      <SMainDiv>
        <p style={{ color: "black" }}>Trending Movies</p>
        <SH1>I want to show trending movies here.</SH1>
        <SH1WrapperDiv />
        {HomePageState.trendingMovies.length !== 0 && (
          <MoviesMap
            movies={HomePageState.trendingMovies}
            sectionType={"trending"}
            sectionCount={HomePageState.sectionCount}
          />
        )}
        <SearchBar />
        {HomePageState.submitSearch && HomePageState.searchedMovies.length === 0 && (
          <p>No movies found for '{HomePageState.submittedSearch}'</p>
        )}
        {HomePageState.searchedMovies.length !== 0 && <SearchedMovies />}
      </SMainDiv>
    </>
  );
};
