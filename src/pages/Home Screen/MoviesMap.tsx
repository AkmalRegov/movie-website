import React from "react";
import { movieData } from "./TrendingMovies";
import {
  BsChevronLeft as LeftWideArrow,
  BsChevronRight as RightWideArrow,
  BsDot,
} from "react-icons/bs";
import styled from "styled-components";

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;
  border: 1px solid black;
`;

const SLeftWideArrow = styled(LeftWideArrow)`
  cursor: pointer;
  user-select: none;
  margin-top: 6rem;
`;

const SRightWideArrow = styled(RightWideArrow)`
  cursor: pointer;
  user-select: none;
  margin-top: 6rem;
`;

const SMovieCardDiv = styled.div`
  display: flex;
  width: "155px";
  flex-direction: column;
  text-align: center;
  word-wrap: break-word;
`;

const SMovieTitle = styled.strong`
  margin-top: 8px;
  width: 155px;
`;

const SMovieReleaseDate = styled.p`
  margin: 0;
  margin-top: 10px;
`;

const MoviesMap: React.FC<{
  movies: movieData[];
  sectionCount: number;
  setSectionCount: React.Dispatch<React.SetStateAction<number>>;
  maxSectionCount?: number;
}> = ({ movies, sectionCount, setSectionCount, maxSectionCount }) => {
  function handlePrevious() {
    if (sectionCount === 1) return;
    setSectionCount(() => {
      return sectionCount - 1;
    });
  }

  function handleNext() {
    if (sectionCount === (maxSectionCount !== undefined ? maxSectionCount : 5)) return;
    setSectionCount(() => {
      return sectionCount + 1;
    });
  }

  function parseDate(dateString: string) {
    var parts = dateString.split("-") as string[];
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    var res = mydate.toDateString().split(" ");
    var unknownDate = res.filter((ele) => {
      if (ele === "Invalid") return true;
    });
    if (unknownDate.length > 0) return "";
    var resString = `${res[1]} ${res[2]}, ${res[3]}`;
    return resString;
  }

  return (
    <>
      <SMainDiv>
        <div style={{ display: "flex" }}>
          <SLeftWideArrow size={40} onClick={handlePrevious} />
          {movies.slice((sectionCount - 1) * 4, sectionCount * 4).map((data, index) => {
            return (
              <SMovieCardDiv key={index}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
                  alt={`A movie poster for the movie titled: ${data.title}`}
                  loading="lazy"
                  width={155}
                  height={225}
                />
                <SMovieTitle>{data.title}</SMovieTitle>
                <SMovieReleaseDate>{parseDate(data.release_date)}</SMovieReleaseDate>
              </SMovieCardDiv>
            );
          })}
          <SRightWideArrow size={40} onClick={handleNext} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BsDot size={20} />
          <BsDot size={30} />
          <BsDot size={40} style={{ color: "fuchsia" }} />
          <BsDot size={30} />
          <BsDot size={20} />
        </div>
      </SMainDiv>
    </>
  );
};

export default MoviesMap;
