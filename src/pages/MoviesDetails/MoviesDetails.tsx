import React from "react";
import { useParams } from "react-router-dom";

//route params always give strings
//link: https://dev.to/javila35/react-router-hook-useparam-now-w-typescript-m93
type RouteParams = {
  movieId: string;
};

export const MoviesDetails: React.FC = () => {
  const { movieId } = useParams<RouteParams>(); //cannot use interface for useParams generic
  return (
    <>
      <div>MoviesDetails {movieId}</div>
    </>
  );
};
