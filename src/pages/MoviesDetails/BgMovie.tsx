import React from "react";
import styled from "styled-components";
import { SEARCH_ONE_MOVIE } from "../../restapi";

const SBackdropDiv = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  width: inherit;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.style?.backgroundImage &&
    `linear-gradient(to right, rgba(31.5, 31.5, 52.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 52.5, 0.84) 50%, rgba(31.5, 31.5, 52.5, 0.84) 100%),url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${props.style.backgroundImage})`};
`;

const BgMovie: React.FC<{
  movieData: SEARCH_ONE_MOVIE.oneMovieData;
  children: React.ReactNode;
}> = ({ movieData, children }) => {
  return (
    <>
      {movieData?.backdrop_path ? (
        <SBackdropDiv
          style={{
            backgroundImage: movieData?.backdrop_path,
          }}
        >
          {children}
        </SBackdropDiv>
      ) : (
        <div style={{ backgroundColor: "blue" }}>{children}</div>
      )}
    </>
  );
};

export default BgMovie;
