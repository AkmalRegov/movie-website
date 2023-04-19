import React, { useState, useEffect, useRef, useContext } from "react";
// import { useDebounce } from "../../customHooks/useDebounce";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";
import SearchBar from "./SearchBar";
import { CREATE_REQUEST_TOKEN, SEARCH_MOVIES } from "../../restapi";
import styled from "styled-components";
import { HomePageContext } from "../../context/HomePage/HomePageContext";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";

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
  const { state: userAccess, dispatch: userAccessDispatch } = useContext(UserAccessContext);
  const { data } = useLoaderData() as RouteLoaderData;
  // const debouncedSearch = useDebounce(searchText, 2000);
  const callOnce = useRef<boolean>(false);
  const navigate = useNavigate();

  function calcMaxSectionCount(data: movieData[]): number {
    var count = Math.floor(data.length / 4);
    console.log(`count is: ${count}`);
    var remainder = data.length % 4;
    if (remainder > 0) count += 1;
    return count;
  }

  function handleCreateRequestTokenV4(uniqueString: string) {
    CREATE_REQUEST_TOKEN.tmdb_postCreateRequestTokenV4(uniqueString).then(
      (data: CREATE_REQUEST_TOKEN.apiResponse) => {
        console.log("data from node request here is: ", data);
        userAccessDispatch({ type: "initialize requestToken", requestToken: data.request_token });
        window
          .open(
            `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
            "_blank",
          )
          ?.focus();
      },
    );
  }

  function handleCreateUserAccessToken(uniqueString: string) {}

  useEffect(() => {
    if (callOnce.current) return;
    HomePageDispatch({ type: "get trending movies", trendingMovies: data.results });
    var uniqueString = crypto.randomUUID();
    userAccessDispatch({ type: "initialize uniqueKey", uniqueKey: uniqueString });
    handleCreateRequestTokenV4(uniqueString);
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
        <p>Trending Movies</p>
        <SH1WrapperDiv>
          <SH1>I want to show trending movies here.</SH1>
          {userAccess.requestToken !== "" && (
            <div>
              <p style={{ color: "black" }}>
                If you have approved the request token, click here to get authenticated.
              </p>
              <Link to={`/user_authentication/${userAccess.uniqueKey}`}>
                <button>Get authenticated</button>
              </Link>
            </div>
          )}
        </SH1WrapperDiv>
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
