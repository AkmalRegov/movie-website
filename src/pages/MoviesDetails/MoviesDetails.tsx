import React, { useEffect, useRef, useState } from "react";
import { useParams, redirect, useLoaderData } from "react-router-dom";
import * as API from "../../restapi";
import { FaList } from "react-icons/fa";
import styled from "styled-components";
import MovieTitleReleaseYearContent from "./MovieTitleReleaseYearContent";
import MovieCertificationP from "./MovieCertificationP";
import MovieRuntimeP from "./MovieRuntimeP";
import MovieReleaseDateP from "./MovieReleaseDateP";
import BgMovie from "./BgMovie";
import UserScoreFC from "./UserScoreFC";

//route params always give strings
//link: https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93
type RouteParams = {
  movieId: string;
};

type RouteLoaderData = {
  fetchedOneMovieData: oneMovieData;
  fetchedMovieReleaseDatesData: movieReleaseDates;
};

export type oneMovieData = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    },
  ];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: [
    {
      name: string;
      id: number;
      logo_path: string | null;
      origin_country: string;
    },
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    },
  ];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: [
    {
      iso_638_1: string;
      name: string;
    },
  ];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type movieReleaseDates = {
  id: number;
  results: [
    {
      iso_3166_1: string;
      release_dates: [
        {
          certification: string;
          iso_639_1: string;
          release_date: string;
          type: number;
          note: string;
        },
      ];
    },
  ];
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
  height: 440px;
  width: 100vw;
  margin-right: 20px;
`;

const SGenreP = styled.a`
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    filter: brightness(0.3);
  }
`;

export const MoviesDetails: React.FC = () => {
  const { movieId } = useParams<RouteParams>(); //cannot use interface for useParams generic
  const { fetchedOneMovieData, fetchedMovieReleaseDatesData } = useLoaderData() as RouteLoaderData;
  const [movieData, setMovieData] = useState<oneMovieData>();
  const [movieUSCertification, setMovieUSCertification] = useState("");
  const callOnce = useRef<boolean>(false);

  function parseGenreURL(genreId: number, genreName: string) {
    return encodeURI(
      `https://www.themoviedb.org/genre/${genreId}-${genreName
        .toLowerCase()
        .replace(" ", "-")}/movie`,
    );
  }

  useEffect(() => {
    if (callOnce.current) return;
    document.querySelector("title")!.innerHTML = `MovieDetails ${movieId}`;
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
    callOnce.current = true;
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>MoviesDetails {movieId}</div>
      <section style={{ display: "flex" }}>
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
                        <SGenreP
                          key={index}
                          style={{ color: "white" }}
                          target="_blank"
                          href={parseGenreURL(ele.id, ele.name)}
                        >
                          {ele.name}
                          {index !== movieData.genres.length - 1 ? "," : ""}
                        </SGenreP>
                      ))}
                      <MovieRuntimeP runtime={movieData.runtime as number} />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <UserScoreFC movieData={movieData} />
                    </div>
                  </div>
                </SPosterRightSideContentDiv>
              </BgMovie>
            </>
          )}
        </div>
      </section>
    </>
  );
};
