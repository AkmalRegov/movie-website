import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import styled from "styled-components";

const SGoPrimitiveDot = styled(GoPrimitiveDot)`
  margin-top: 1px;
  color: whitesmoke;
`;

const MovieRuntimeP: React.FC<{ runtime: number }> = ({ runtime }) => {
  function parseMovieRuntime(runtime: number) {
    var hours = Math.floor(runtime / 60);
    var mins = runtime % 60;
    return `${hours}h ${mins}min`;
  }
  return (
    <>
      {runtime && (
        <>
          <SGoPrimitiveDot style={{ marginTop: "1px", color: "whitesmoke" }} size={12} />
          <p style={{ color: "whitesmoke" }}>{parseMovieRuntime(runtime as number)}</p>
        </>
      )}
    </>
  );
};

export default MovieRuntimeP;
