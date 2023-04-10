import React, { useEffect, useRef, useState } from "react";
import { useParams, redirect, useLoaderData } from "react-router-dom";
import * as API from "../../restapi";

//route params always give strings
//link: https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93
type RouteParams = {
  movieId: string;
};

type RouteLoaderData = {
  data: oneMovieData;
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

export const MoviesDetails: React.FC = () => {
  const { movieId } = useParams<RouteParams>(); //cannot use interface for useParams generic
  const { data: dataMovie } = useLoaderData() as RouteLoaderData;
  const [movieData, setMovieData] = useState<oneMovieData>();
  const callOnce = useRef<boolean>(false);

  useEffect(() => {
    if (callOnce.current) return;
    document.querySelector("title")!.innerHTML = `MovieDetails ${movieId}`;
    console.log("dataMovie is: ", dataMovie);
    setMovieData(dataMovie);
    callOnce.current = true;
    // API.tmdb_searchOneMovie(parseInt(movieId as string))
    //   .then((res) => res.json())
    //   .then((data: oneMovieData) => {
    //     setMovieData(data);
    //     console.log(data);
    //     console.log(data.backdrop_path);
    //     console.log(movieData?.backdrop_path);
    //     callOnce.current = true;
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>MoviesDetails {movieId}</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100vw", height: "500px", border: "1px solid black" }}>
          {movieData?.backdrop_path ? (
            <>
              <div
                style={{
                  backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData?.backdrop_path})`,
                  height: "inherit",
                  width: "inherit",
                }}
              ></div>
            </>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </>
  );
};
