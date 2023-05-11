import React from "react";
import styled from "styled-components";

const SMovieCertificationP = styled.p`
  width: fit-content;
  color: gray;
  padding: 2px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid gray;
`;

const MovieCertificationP: React.FC<{ movieUSCertification: string }> = ({
  movieUSCertification,
}) => {
  return (
    <>
      {movieUSCertification && <SMovieCertificationP>{movieUSCertification}</SMovieCertificationP>}
    </>
  );
};

export default MovieCertificationP;
