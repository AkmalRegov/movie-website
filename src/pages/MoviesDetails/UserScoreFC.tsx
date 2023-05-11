import React from "react";
import { oneMovieData } from "./MoviesDetails";
import { DynamicUserScore } from "../../component";
import styled from "styled-components";

const SPercentageSymbolP = styled.p`
  color: white;
  font-size: 10px;
  position: relative;
  top: 10px;
  right: 32px;
`;

const SPercentageScoreH2 = styled.h2`
  color: white;
  position: relative;
  right: 60px;
  bottom: 8px;
`;

const SUserScoreTextH3 = styled.h3`
  color: white;
  font-size: 16px;
  position: relative;
  right: 22px;
`;

const UserScoreFC: React.FC<{ movieData: oneMovieData }> = ({ movieData }) => {
  return (
    <>
      <DynamicUserScore size={90} strokeWidth={8} progress={Math.ceil(movieData.vote_average * 10)}>
        <div>
          <SPercentageSymbolP>%</SPercentageSymbolP>
          <SPercentageScoreH2>{Math.floor(movieData.vote_average * 10)}</SPercentageScoreH2>
        </div>
        <SUserScoreTextH3>
          User <br /> Score
        </SUserScoreTextH3>
      </DynamicUserScore>
    </>
  );
};

export default UserScoreFC;
