import React, { useContext, useState } from "react";
import {
  BsChevronLeft as LeftWideArrow,
  BsChevronRight as RightWideArrow,
  BsDot,
} from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HomePageContext } from "../context/HomePage/HomePageContext";
import { SEARCH_MOVIES } from "../restapi";

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 1rem;
  border: 1px solid black;
`;

const SLeftWideArrow = styled(LeftWideArrow)`
  cursor: ${(props) => (props.className === "enabled" ? "pointer" : "default")};
  user-select: none;
  margin-top: 6rem;
  color: ${(props) => (props.className === "enabled" ? "black" : "gray")};
`;

const SRightWideArrow = styled(RightWideArrow)`
  cursor: ${(props) => (props.className === "enabled" ? "pointer" : "default")};
  user-select: none;
  margin-top: 6rem;
  color: ${(props) => (props.className === "enabled" ? "black" : "gray")};
`;

const SMovieCardDiv = styled.div`
  display: flex;
  width: 155px;
  flex-direction: column;
  text-align: center;
  word-wrap: break-word;
  align-items: center;
`;

const SMovieTitleStrong = styled.strong`
  color: ${(props) => (props.className === "hovered" ? "blue" : "black")};
  margin-top: 8px;
  width: 155px;
`;

const SMovieReleaseDate = styled.p`
  color: black;
  margin: 0;
  margin-top: 10px;
`;

const SBsDotMapDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SMovieLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  &:hover {
    color: blue;
  }
`;

const SMainContentDiv = styled.div`
  display: flex;
  height: 380px;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const SMoviesDiv = styled.div`
  display: flex;
  gap: 1.5rem;
`;

//Simplifications
type movieData = SEARCH_MOVIES.movieData;

const BsDotMap: React.FC<{ sectionCount: number; maxSectionCount?: number }> = ({
  sectionCount,
  maxSectionCount,
}) => {
  var bsDotIndex = [];
  var count = maxSectionCount ?? 5;
  for (let index = 0; index < count; index++) {
    bsDotIndex.push(index + 1);
  }
  return (
    <>
      {bsDotIndex.map((val) => {
        return (
          <BsDot
            key={val}
            size={sectionCount === val ? 50 : 30}
            style={{ color: sectionCount === val ? "fuchsia" : "black" }}
          />
        );
      })}
    </>
  );
};

const MoviesMap: React.FC<{
  movies: movieData[];
  sectionType: "trending" | "searched";
  sectionCount: number;
  maxSectionCount?: number;
}> = ({ movies, sectionType, sectionCount, maxSectionCount }) => {
  const { dispatch: HomePageDispatch } = useContext(HomePageContext);
  const [linkHovered, setLinkHovered] = useState({ flag: false, index: -1 });

  const handlePrevious = () => {
    if (sectionCount === 1) return;
    switch (sectionType) {
      case "trending":
        return HomePageDispatch({
          type: "go to previous trending section",
          sectionCount: sectionCount - 1,
        });
      case "searched":
        return HomePageDispatch({
          type: "go to previous searched section",
          searchedSectionCount: sectionCount - 1,
        });
    }
  };

  const handleNext = () => {
    if (sectionCount === (maxSectionCount !== undefined ? maxSectionCount : 5)) return;
    switch (sectionType) {
      case "trending":
        return HomePageDispatch({
          type: "go to next trending section",
          sectionCount: sectionCount + 1,
        });
      case "searched":
        return HomePageDispatch({
          type: "go to next searched section",
          searchedSectionCount: sectionCount + 1,
        });
    }
  };

  const parseDate = (dateString: string) => {
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
  };

  return (
    <>
      <SMainDiv>
        <SMainContentDiv>
          <SLeftWideArrow
            size={40}
            onClick={handlePrevious}
            className={sectionCount === 1 ? "disabled" : "enabled"}
          />
          <SMoviesDiv>
            {movies.slice((sectionCount - 1) * 4, sectionCount * 4).map((data, index) => {
              return (
                <SMovieCardDiv key={index}>
                  <SMovieLink
                    to={`movie/${data.id}`}
                    onMouseOver={() => setLinkHovered({ flag: true, index: index })}
                    onMouseOut={() => {
                      setLinkHovered({ flag: false, index: index });
                    }}
                  >
                    <img
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
                      alt={`A movie poster for the movie titled: ${data.title}`}
                      loading="lazy"
                      width={155}
                      height={225}
                    />
                    <SMovieTitleStrong
                      className={
                        linkHovered.flag && linkHovered.index === index ? "hovered" : "notHovered"
                      }
                    >
                      {data.title}
                    </SMovieTitleStrong>
                  </SMovieLink>
                  <SMovieReleaseDate>{parseDate(data.release_date)}</SMovieReleaseDate>
                </SMovieCardDiv>
              );
            })}
          </SMoviesDiv>
          <SRightWideArrow
            size={40}
            onClick={handleNext}
            className={
              sectionCount === (maxSectionCount !== undefined ? maxSectionCount : 5)
                ? "disabled"
                : "enabled"
            }
          />
        </SMainContentDiv>
        <SBsDotMapDiv>
          <BsDotMap sectionCount={sectionCount} maxSectionCount={maxSectionCount} />
        </SBsDotMapDiv>
      </SMainDiv>
    </>
  );
};

export default MoviesMap;
