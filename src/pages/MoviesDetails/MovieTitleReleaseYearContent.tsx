import React from "react";
import styled from "styled-components";
import { SEARCH_ONE_MOVIE } from "../../restapi";

const SMovieTitleReleaseYearWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  align-items: center;
`;

const SMovieTitleH2 = styled.h2`
  color: white;
  margin: 0;
  font-size: 32px;
`;

const SMovieReleaseDateH2 = styled.h2`
  color: gray;
  margin: 0;
  font-size: 32px;
  text-indent: 10px;
`;

const MovieTitleReleaseYearContent: React.FC<{ movieData: SEARCH_ONE_MOVIE.oneMovieData }> = ({
  movieData,
}) => {
  return (
    <>
      <SMovieTitleReleaseYearWrapperDiv>
        <SMovieTitleH2>{movieData?.title}</SMovieTitleH2>
        <SMovieReleaseDateH2> ({movieData?.release_date.split("-")[0]})</SMovieReleaseDateH2>
      </SMovieTitleReleaseYearWrapperDiv>
    </>
  );
};

export default MovieTitleReleaseYearContent;
