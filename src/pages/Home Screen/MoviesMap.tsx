import React from "react";
import { movieData } from "./TrendingMovies";
import {
  BsChevronLeft as LeftWideArrow,
  BsChevronRight as RightWideArrow,
} from "react-icons/bs";

const MoviesMap: React.FC<{
  movies: movieData[];
  sectionCount: number;
  setSectionCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ movies, sectionCount, setSectionCount }) => {
  function handlePrevious() {
    if (sectionCount === 1) return;
    setSectionCount(() => {
      return sectionCount - 1;
    });
  }

  function handleNext() {
    if (sectionCount === 5) return;
    setSectionCount(() => {
      return sectionCount + 1;
    });
  }

  function parseDate(dateString: string) {
    var parts = dateString.split("-") as string[];
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    );
    var res = mydate.toDateString().split(" ");
    var resString = `${res[1]} ${res[2]}, ${res[3]}`;
    return resString;
  }

  return (
    <>
      <div
        style={{
          marginLeft: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <LeftWideArrow
          size={40}
          style={{ marginTop: "6rem", cursor: "pointer", userSelect: "none" }}
          onClick={handlePrevious}
        />
        {movies
          .slice((sectionCount - 1) * 4, sectionCount * 4)
          .map((data, index) => {
            console.log(`index is: ${index}`);
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`}
                  alt={`A movie poster for the movie titled: ${data.title}`}
                  loading="lazy"
                  width={155}
                  height={225}
                />
                <strong style={{ width: "155px" }}>{data.title}</strong>
                <p style={{ margin: 0, marginTop: "10px" }}>
                  {parseDate(data.release_date)}
                </p>
              </div>
            );
          })}
        <RightWideArrow
          size={40}
          style={{ marginTop: "6rem", cursor: "pointer", userSelect: "none" }}
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default MoviesMap;
