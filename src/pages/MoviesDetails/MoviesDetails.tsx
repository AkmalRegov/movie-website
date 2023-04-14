import React, { useEffect, useRef, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import * as API from "../../restapi";
import styled from "styled-components";
import MovieTitleReleaseYearContent from "./MovieTitleReleaseYearContent";
import MovieCertificationP from "./MovieCertificationP";
import MovieRuntimeP from "./MovieRuntimeP";
import MovieReleaseDateP from "./MovieReleaseDateP";
import BgMovie from "./BgMovie";
import IconDiv from "./IconDiv";
import MovieReviewSection from "./MovieReviewCard";

//route params always give strings
//link: https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93

type oneMovieData = API.SEARCH_ONE_MOVIE.oneMovieData;
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
  border: 1px solid whitesmoke;
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

  function parseGenreURL(genreId: number, genreName: string) {
    return encodeURI(
      `https://www.themoviedb.org/genre/${genreId}-${genreName
        .toLowerCase()
        .replace(" ", "-")}/movie`,
    );
  }

  function handleRouteLoaderData() {
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
      return res;
    });
    console.log("fetchedMovieReviews is: ", fetchedMovieReviews);
  }

  useEffect(() => {
    if (callOnce.current) return;
    document.querySelector("title")!.innerHTML = `MovieDetails ${movieId}`;
    handleRouteLoaderData();
    callOnce.current = true;
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>MoviesDetails {movieId}</div>
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          alignContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100vw", height: "500px", border: "1px solid black" }}>
          {movieData && (
            <>
              {" "}
              <BgMovie movieData={movieData as oneMovieData}>
                <SMoviePosterImage
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
                  alt={`A poster for the movie ${movieData?.title}`}
                />
                <SPosterRightSideContentDiv>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <MovieTitleReleaseYearContent movieData={movieData} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "8px",
                        gap: "4px",
                      }}
                    >
                      <MovieCertificationP movieUSCertification={movieUSCertification} />
                      <MovieReleaseDateP movieData={movieData} />
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
                      <MovieRuntimeP runtime={movieData.runtime as number} />
                    </div>
                    <IconDiv movieData={movieData} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <em style={{ color: "gray", fontWeight: 500 }}>{movieData.tagline}</em>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <h3 style={{ fontSize: "20px", color: "white" }}>Overview</h3>
                        <p style={{ color: "white" }}>{movieData.overview}</p>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        {top5Crew &&
                          top5Crew.map((item, index) => {
                            return (
                              <div key={index} style={{ display: "flex", flexDirection: "column" }}>
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
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </SPosterRightSideContentDiv>
              </BgMovie>
            </>
          )}
        </div>
      </section>
      <MovieReviewSection fetchedMovieReviews={fetchedMovieReviews} />
    </>
  );
};
