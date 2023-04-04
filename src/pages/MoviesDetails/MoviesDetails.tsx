import React from "react";
import { useParams } from "react-router-dom";

export const MoviesDetails: React.FC = () => {
  const { movieId } = useParams();
  return (
    <>
      <div>MoviesDetails {movieId}</div>
    </>
  );
};
