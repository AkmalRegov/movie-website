import React from "react";

const MovieCertificationP: React.FC<{ movieUSCertification: string }> = ({
  movieUSCertification,
}) => {
  return (
    <>
      {movieUSCertification && (
        <p
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "gray",
            border: "1px solid gray",
            width: "fit-content",
          }}
        >
          {movieUSCertification}
        </p>
      )}
    </>
  );
};

export default MovieCertificationP;
