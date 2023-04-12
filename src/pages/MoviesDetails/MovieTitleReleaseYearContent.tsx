import React from "react";
import styled from "styled-components";
import { oneMovieData } from "./MoviesDetails";

const SMovieTitleReleaseYearWrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  align-items: center;
`;

const MovieTitleReleaseYearContent: React.FC<{ movieData: oneMovieData }> = ({ movieData }) => {
  return (
    <>
      <SMovieTitleReleaseYearWrapperDiv>
        <h2 style={{ color: "white", fontSize: "32px", margin: "0" }}>{movieData?.title}</h2>
        <h2 style={{ fontSize: "32px", textIndent: "10px", color: "gray", margin: "0" }}>
          {" "}
          ({movieData?.release_date.split("-")[0]})
        </h2>
      </SMovieTitleReleaseYearWrapperDiv>
    </>
  );
};

export default MovieTitleReleaseYearContent;
