import React, { useState, useEffect } from "react";

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrendingMovies(data);
        console.log();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div>Trending Movies</div>
      <h1>I want to show trending movies here.</h1>
    </>
  );
}
