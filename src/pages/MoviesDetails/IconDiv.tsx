import React from "react";
import { oneMovieData } from "./MoviesDetails";
import UserScoreFC from "./UserScoreFC";
import { IoHeartCircle, IoListCircleSharp } from "react-icons/io5";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { MdStars } from "react-icons/md";

const IconDiv: React.FC<{ movieData: oneMovieData }> = ({ movieData }) => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <UserScoreFC movieData={movieData} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <IoListCircleSharp
            size={40}
            color="black"
            style={{
              backgroundColor: "white",
              borderRadius: "100%",
            }}
          />
          <IoHeartCircle
            size={40}
            color="black"
            style={{
              backgroundColor: "white",
              borderRadius: "100%",
            }}
          />
          <BsFillBookmarkPlusFill
            size={40}
            color="black"
            style={{
              backgroundColor: "white",
              borderRadius: "100%",
            }}
          />
          <MdStars
            size={40}
            color="black"
            style={{
              backgroundColor: "white",
              borderRadius: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default IconDiv;
