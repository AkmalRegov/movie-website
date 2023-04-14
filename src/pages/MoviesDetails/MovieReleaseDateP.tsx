import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { SEARCH_ONE_MOVIE } from "../../restapi";

const MovieReleaseDateP: React.FC<{ movieData: SEARCH_ONE_MOVIE.oneMovieData }> = ({
  movieData,
}) => {
  function parseDate(dateString: string) {
    var parts = dateString.split("-") as string[];
    var resString = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return resString;
  }

  return (
    <>
      {movieData?.release_date && (
        <>
          <p style={{ color: "whitesmoke" }}>{parseDate(movieData?.release_date as string)}</p>
          <GoPrimitiveDot style={{ marginTop: "1px", color: "whitesmoke" }} size={12} />
        </>
      )}
    </>
  );
};

export default MovieReleaseDateP;
