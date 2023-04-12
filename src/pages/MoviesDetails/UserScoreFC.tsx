import React from "react";
import { oneMovieData } from "./MoviesDetails";
import { DynamicUserScore } from "../../component";

const UserScoreFC: React.FC<{ movieData: oneMovieData }> = ({ movieData }) => {
  return (
    <>
      <DynamicUserScore size={90} strokeWidth={8} progress={Math.ceil(movieData.vote_average * 10)}>
        <div>
          <p
            style={{
              color: "white",
              position: "relative",
              top: 10,
              right: 32,
              fontSize: 10,
            }}
          >
            %
          </p>
          <h2 style={{ color: "white", position: "relative", right: 60, bottom: 8 }}>
            {Math.floor(movieData.vote_average * 10)}
          </h2>
        </div>
        <h3 style={{ color: "white", position: "relative", right: 22, fontSize: 16 }}>
          User <br /> Score
        </h3>
      </DynamicUserScore>
    </>
  );
};

export default UserScoreFC;
