import React, { useState, useEffect, useRef } from "react";

type apiResponse = {
  page: string;
  results: movieData[];
  total_page: number;
  total_results: number;
};

type movieData = {
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

const MoviesMap: React.FC<{ movies: movieData[] }> = ({ movies }) => {
  return (
    <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem" }}>
      {movies.map((data, index) => {
        console.log(`index is: ${index}`);
        return (
          <div
            key={index}
            style={{
              width: "max-content",
              display: "grid",
              textAlign: "center",
            }}
          >
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
              alt=""
              loading="lazy"
              width={155}
              height={225}
            />
            <strong style={{ width: "155px" }}>Title: {data.title}</strong>
            <p style={{ margin: 0 }}>{data.release_date}</p>
            <p style={{ margin: 0 }}>
              User score is {Math.round(data.vote_average * 10)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const TrendingMovies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<movieData[]>([]);
  const callOnce = useRef<boolean>(false);
  const apiURL = process.env.API_V3_URL;
  const myV3APIKey = process.env.MY_API_KEY;

  useEffect(() => {
    if (callOnce.current) return;
    fetch(`${apiURL}trending/movie/week?api_key=${myV3APIKey}`)
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <p>Trending Movies</p>
        <h1 style={{ margin: 0, marginBottom: "20px" }}>
          I want to show trending movies here.
        </h1>
        <div
          style={{
            display: "flex",
            width: "1420px",
          }}
        >
          {trendingMovies.length !== 0 && <MoviesMap movies={trendingMovies} />}
        </div>
      </div>
    </>
  );
};

export default TrendingMovies;
