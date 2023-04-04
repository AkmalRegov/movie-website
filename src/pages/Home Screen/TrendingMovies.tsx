import React, { useState, useEffect, useRef } from "react";
import MoviesMap from "./MoviesMap";

export type apiResponse = {
  page: string;
  results: movieData[];
  total_page: number;
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

const TrendingMovies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<movieData[]>([]);
  const [sectionCount, setSectionCount] = useState(1);
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
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <form style={{ display: "flex" }}>
            <input
              placeholder="Search movies"
              style={{
                display: "flex",
                width: "600px",
                height: "40px",
                borderRadius: "20px",
                textIndent: "6px",
                fontSize: "16px",
              }}
            />
            <button
              type="submit"
              style={{
                borderRadius: "20px",
                height: "45px",
                position: "relative",
                right: 60,
                backgroundColor: "fuchsia",
              }}
            >
              <p style={{ margin: 0, padding: 0, color: "white" }}>Search</p>
            </button>
          </form>
          <h1 style={{ margin: 0, marginTop: "20px" }}>
            I want to show trending movies here.
          </h1>
        </div>
        {trendingMovies.length !== 0 && (
          <MoviesMap
            movies={trendingMovies}
            sectionCount={sectionCount}
            setSectionCount={setSectionCount}
          />
        )}
      </div>
    </>
  );
};

export default TrendingMovies;
