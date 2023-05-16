import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import * as API from "../../restapi";
import styled from "styled-components";
import MovieTitleReleaseYearContent from "./MovieTitleReleaseYearContent";
import BgMovie from "./BgMovie";
import IconDiv from "./IconDiv";
import MovieReviewSection from "./MovieReviewSection";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";
import { GoPrimitiveDot } from "react-icons/go";
import { UserDetailsContext } from "../../context/UserDetails/UserDetailsContext";

//route params always give strings
//link: https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93

export type oneMovieData = API.SEARCH_ONE_MOVIE.oneMovieData;
type movieReleaseDates = API.MOVIE_CERTIFICATION.movieReleaseDates;
type movieCastCrewType = API.GET_MOVIE_CAST_CREW.movieCastCrewType;
type crewInterface = API.GET_MOVIE_CAST_CREW.crewInterface;
type movieReview = API.GET_MOVIE_REVIEWS.movieReview;

type RouteParams = {
  movieId: string;
};

type RouteLoaderData = {
  fetchedOneMovieData: oneMovieData;
  fetchedMovieReleaseDatesData: movieReleaseDates;
  fetchedMovieCastCrew: movieCastCrewType;
  fetchedMovieReviews: movieReview;
};

const SMoviePosterImage = styled.img`
  object-fit: cover;
  width: auto;
  height: 440px;
  margin-left: 20px;
  border-radius: 10px;
`;

const SPosterRightSideContentDiv = styled.div`
  margin-left: 3rem;
  min-height: 440px;
  max-height: fit-content;
  width: 100vw;
  margin-right: 20px;
`;

const SGenreA = styled.a`
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    filter: brightness(0.3);
  }
`;

const SCrewA = styled(SGenreA)``;

const SMoviesDetailsDiv = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const SMoviesDetailsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: center;
  box-sizing: border-box;
`;

const SMoviesDetailsBoxDiv = styled.div`
  width: 100vw;
  height: 500px;
  border: 1px solid black;
`;

const SFlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SMoviesDetailsContentDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 4px;
`;

const SMovieTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SMovieTaglineEm = styled.em`
  color: gray;
  font-weight: 500;
`;

const SMovieOverviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SMovieOverviewH3 = styled.h3`
  font-size: 20px;
  color: white;
`;

const SMovieCrewDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SMovieCertificationP = styled.p`
  width: fit-content;
  color: gray;
  padding: 2px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid gray;
`;

const SGoPrimitiveDot = styled(GoPrimitiveDot)`
  margin-top: 1px;
  color: whitesmoke;
`;

const parseDate = (dateString: string) => {
  var parts = dateString.split("-") as string[];
  var resString = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return resString;
};

const parseGenreURL = (genreId: number, genreName: string) => {
  return encodeURI(
    `https://www.themoviedb.org/genre/${genreId}-${genreName
      .toLowerCase()
      .replace(" ", "-")}/movie`,
  );
};

const parseMovieRuntime = (runtime: number) => {
  var hours = Math.floor(runtime / 60);
  var mins = runtime % 60;
  return `${hours}h ${mins}min`;
};

export const MoviesDetails: React.FC = () => {
  const { movieId } = useParams<RouteParams>(); //cannot use interface for useParams generic
  const {
    fetchedOneMovieData,
    fetchedMovieReleaseDatesData,
    fetchedMovieCastCrew,
    fetchedMovieReviews,
  } = useLoaderData() as RouteLoaderData;
  const [movieData, setMovieData] = useState<oneMovieData>();
  const [top5Crew, setTop5Crew] = useState<crewInterface[]>();
  const [movieUSCertification, setMovieUSCertification] = useState("");
  const callOnce = useRef<boolean>(false);
  const { state: userAccessState } = useContext(UserAccessContext);
  const { state: userDetailsState } = useContext(UserDetailsContext);
  const [userWatchlist, setUserWatchlist] = useState({} as API.GET_WATCHLIST.Watchlist);

  const returnWatchlist = async (page: number): Promise<API.GET_WATCHLIST.Watchlist> => {
    return API.GET_WATCHLIST.tmdb_getWatchlist(
      userDetailsState?.id,
      userAccessState?.sessionString,
      page,
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("watchlist data is: ", data);
        return data;
      });
  };

  const loopReturnWatchlist = async (): Promise<API.GET_WATCHLIST.Watchlist> => {
    var data: API.GET_WATCHLIST.Watchlist = {} as API.GET_WATCHLIST.Watchlist;
    var page = 1;
    var temp_res = await returnWatchlist(page);
    data = temp_res;
    while (temp_res.total_pages > page) {
      page += 1;
      temp_res = await returnWatchlist(page);
      temp_res.results.forEach((ele) => {
        data.results.push(ele);
      });
    }
    return data;
  };

  const setReturnWatchlist = async () => {
    loopReturnWatchlist().then((data) => {
      console.log("watchlist data is: ", data);
      setUserWatchlist(data);
    });
  };

  useEffect(() => {
    if (userDetailsState?.username != "") {
      setReturnWatchlist();
    }
  }, []);

  const handleRouteLoaderData = () => {
    console.log("fetchedOneMovieData is: ", fetchedOneMovieData);
    setMovieData(fetchedOneMovieData);
    console.log(
      "The US certification is: ",
      fetchedMovieReleaseDatesData.results.find((ele) => ele.iso_3166_1 === "US")?.release_dates[0]
        .certification,
    );
    setMovieUSCertification(
      fetchedMovieReleaseDatesData.results.find((ele) => ele.iso_3166_1 === "US")?.release_dates[0]
        .certification as string,
    );
    console.log("fetchedMovieCastCrew is: ", fetchedMovieCastCrew);
    setTop5Crew(() => {
      var sorted = fetchedMovieCastCrew.crew.sort((a, b) => b.popularity - a.popularity);
      var res = [];
      var unwantedDepartment = ["Crew", "Camera", "Acting"];
      for (var x = 0; x < 5 && sorted.length > x; x++) {
        res.push(sorted[x]);
        var filtered = sorted.filter(
          (ele) =>
            ele.id !== sorted[x].id &&
            unwantedDepartment.every((val) => val !== ele.known_for_department),
        );
        sorted = filtered.sort((a, b) => b.popularity - a.popularity);
      }
      console.log("top 5 crew based on popularity is: ", res);
      console.log(
        "userAccessState.requestTokenApproved is: ",
        userAccessState.requestTokenApproved,
      );
      return res;
    });
    console.log("fetchedMovieReviews is: ", fetchedMovieReviews);
  };

  useEffect(() => {
    if (callOnce.current) return;
    document.querySelector("title")!.innerHTML = `MovieDetails ${movieId}`;
    handleRouteLoaderData();
    callOnce.current = true;
  }, []);
  return (
    <>
      <SMoviesDetailsDiv>MoviesDetails {movieId}</SMoviesDetailsDiv>
      <SMoviesDetailsSection>
        <SMoviesDetailsBoxDiv>
          {movieData && (
            <>
              {" "}
              <BgMovie movieData={movieData as oneMovieData}>
                <SMoviePosterImage
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
                  alt={`A poster for the movie ${movieData?.title}`}
                />
                <SPosterRightSideContentDiv>
                  <SFlexColDiv>
                    <MovieTitleReleaseYearContent movieData={movieData} />
                    <SMoviesDetailsContentDiv>
                      {movieUSCertification && (
                        <SMovieCertificationP>{movieUSCertification}</SMovieCertificationP>
                      )}
                      {movieData?.release_date && (
                        <>
                          <p style={{ color: "whitesmoke" }}>
                            {parseDate(movieData?.release_date as string)}
                          </p>
                          <SGoPrimitiveDot size={12} />
                        </>
                      )}
                      {movieData.genres.map((ele, index) => (
                        <SGenreA
                          key={index}
                          style={{ color: "white" }}
                          target="_blank"
                          href={parseGenreURL(ele.id, ele.name)}
                        >
                          {ele.name}
                          {index !== movieData.genres.length - 1 ? "," : ""}
                        </SGenreA>
                      ))}
                      {movieData.runtime && (
                        <>
                          <SGoPrimitiveDot
                            style={{ marginTop: "1px", color: "whitesmoke" }}
                            size={12}
                          />
                          <p style={{ color: "whitesmoke" }}>
                            {parseMovieRuntime(movieData.runtime as number)}
                          </p>
                        </>
                      )}
                    </SMoviesDetailsContentDiv>
                    <IconDiv
                      movieData={movieData}
                      movieInWatchlist={
                        userWatchlist?.results?.filter((ele) => ele.id === movieData.id).length > 0
                          ? true
                          : false
                      }
                      account_id={userDetailsState?.id}
                      session_id={userAccessState?.sessionString}
                      setReturnWatchlist={setReturnWatchlist}
                    />
                    <SMovieTextDiv>
                      <SMovieTaglineEm>{movieData.tagline}</SMovieTaglineEm>
                      <SMovieOverviewDiv>
                        <SMovieOverviewH3>Overview</SMovieOverviewH3>
                        <p style={{ color: "white" }}>{movieData.overview}</p>
                      </SMovieOverviewDiv>
                      <SMovieCrewDiv>
                        {top5Crew &&
                          top5Crew.map((item, index) => {
                            return (
                              <SFlexColDiv key={index}>
                                <SCrewA
                                  style={{ textDecoration: "none" }}
                                  href={`https://www.themoviedb.org/person/${item.id}-${item.name
                                    .replace(" ", "-")
                                    .toLowerCase()}`}
                                  target="_blank"
                                >
                                  <strong>{item.name}</strong>
                                </SCrewA>
                                <em>{item.known_for_department}</em>
                              </SFlexColDiv>
                            );
                          })}
                      </SMovieCrewDiv>
                    </SMovieTextDiv>
                  </SFlexColDiv>
                </SPosterRightSideContentDiv>
              </BgMovie>
            </>
          )}
        </SMoviesDetailsBoxDiv>
      </SMoviesDetailsSection>
      <MovieReviewSection fetchedMovieReviews={fetchedMovieReviews} />
    </>
  );
};
