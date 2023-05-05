import React, { useState, useEffect, useRef, useContext } from "react";
// import { useDebounce } from "../../customHooks/useDebounce";
import MoviesMap from "./MoviesMap";
import SearchedMovies from "./SearchedMovies";
import SearchBar from "./SearchBar";
import {
  CREATE_REQUEST_TOKEN,
  SEARCH_MOVIES,
  CREATE_ACCESS_TOKEN,
  CREATE_SESSION_WITH_ACCESS_TOKEN,
  GET_ACCOUNT_DETAILS,
} from "../../restapi";
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

  // async function handleCreateRequestTokenV4(uniqueString: string) {
  //   CREATE_REQUEST_TOKEN.tmdb_postCreateRequestTokenV4(uniqueString).then(
  //     (data: CREATE_REQUEST_TOKEN.apiResponse) => {
  //       console.log("data from node request here is: ", data);
  //       userAccessDispatch({ type: "initialize requestToken", requestToken: data.request_token });
  //       window
  //         .open(
  //           `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
  //           "_blank",
  //         )
  //         ?.focus();
  //       return data;
  //     },
  //   );
  // }

  // async function handleCreateUserAccessTokenV4(uniqueString: string, request_token: string) {
  //   var accessTokenResponseWithData = {} as CREATE_ACCESS_TOKEN.apiResponse;
  //   var accountDetailsArgs = {} as CREATE_SESSION_WITH_ACCESS_TOKEN.apiResponse;

  //   accessTokenResponseWithData = await CREATE_ACCESS_TOKEN.tmdb_postCreateAccessTokenV4(
  //     uniqueString,
  //     request_token,
  //   ).then((data: CREATE_ACCESS_TOKEN.apiResponse) => {
  //     console.log("data is: ", data);
  //     userAccessDispatch({ type: "initialize accessToken", accessToken: data.access_token });
  //     userAccessDispatch({
  //       type: "set true for requestTokenApproved",
  //       requestTokenApproved: true,
  //     });
  //     return data;
  //   });

  //   if (accessTokenResponseWithData) {
  //     console.log("accessTokenResponseWithData is:\n", accessTokenResponseWithData);
  //     accountDetailsArgs = await CREATE_SESSION_WITH_ACCESS_TOKEN.tmdb_createSessionWithAccessToken(
  //       userAccess.uniqueKey,
  //       accessTokenResponseWithData.access_token,
  //     ).then((data) => {
  //       console.log("session data is: ", data);
  //       userAccessDispatch({ type: "set session from tmdb", sessionString: data.session_id });
  //       return data;
  //     });
  //   }

  //   if (accountDetailsArgs) {
  //     GET_ACCOUNT_DETAILS.tmdb_getAccountDetails(accountDetailsArgs.session_id).then((data) => {
  //       console.log("account details retrieved are:\n", data);
  //     });
  //   }
  // }

  useEffect(() => {
    if (callOnce.current) return;
    HomePageDispatch({ type: "get trending movies", trendingMovies: data.results });
    //Create request token, access token and session here
    // if (userAccess.requestTokenApproved === false) {
    //   var uniqueString = crypto.randomUUID();
    //   userAccessDispatch({ type: "initialize uniqueKey", uniqueKey: uniqueString });
    //   handleCreateRequestTokenV4(uniqueString);
    // }
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
        <SH1WrapperDiv>
          {/* {userAccess.requestToken !== "" &&
            (userAccess.accessToken === "" ? (
              <>
                <p style={{ color: "black" }}>
                  If you have approved the request token, click the button below to get
                  authenticated
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => {
                      handleCreateUserAccessTokenV4(userAccess.uniqueKey, userAccess.requestToken);
                    }}
                  >
                    Get authenticated
                  </button>
                  <button
                    onClick={() => {
                      handleCreateRequestTokenV4(userAccess.uniqueKey);
                    }}
                  >
                    Request for token again
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={{ color: "black" }}>
                  You have been authenticated and your access token is: {userAccess.accessToken}{" "}
                  <br />
                  and your sessionId is: {userAccess.sessionString}
                </p>
              </>
            ))} */}
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
