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

const MoviesMap: React.FC<{
  movies: movieData[];
  sectionCount: number;
  setSectionCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ movies, sectionCount, setSectionCount }) => {
  function handlePrevious() {
    if (sectionCount === 1) return;
    setSectionCount(() => {
      return sectionCount - 1;
    });
  }

  function handleNext() {
    if (sectionCount === 5) return;
    setSectionCount(() => {
      return sectionCount + 1;
    });
  }

  return (
    <>
      <div
        style={{
          marginLeft: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        {movies
          .slice((sectionCount - 1) * 4, sectionCount * 4)
          .map((data, index) => {
            console.log(`index is: ${index}`);
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
                  alt={`A movie poster for the movie titled: ${data.title}`}
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
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "40px",
        }}
      >
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
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
        <h1 style={{ margin: 0, marginBottom: "20px" }}>
          I want to show trending movies here.
        </h1>
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
