import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { SEARCH_ONE_MOVIE } from "../../restapi";
import styled from "styled-components";

const SGoPrimitiveDot = styled(GoPrimitiveDot)`
  margin-top: 1px;
  color: whitesmoke;
`;

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
          <SGoPrimitiveDot size={12} />
        </>
      )}
    </>
  );
};

export default MovieReleaseDateP;
