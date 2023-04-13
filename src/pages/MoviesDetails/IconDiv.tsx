import React from "react";
import { oneMovieData } from "./MoviesDetails";
import UserScoreFC from "./UserScoreFC";
import { IoHeartCircle, IoListCircleSharp } from "react-icons/io5";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import styled from "styled-components";

const SWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SIconWrapperDiv = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const SOuterWhiteCircleSpan = styled.span`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid white;
  border-radius: 50%;
`;

const SInnerBlackCircleSpan = styled.span`
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 50%;
`;

const IconStyle = { backgroundColor: "white", borderRadius: "100%" };

const IconDiv: React.FC<{ movieData: oneMovieData }> = ({ movieData }) => {
  return (
    <>
      <SWrapperDiv>
        <div>
          <UserScoreFC movieData={movieData} />
        </div>
        <SIconWrapperDiv>
          <IoListCircleSharp size={40} color="black" style={IconStyle} />
          <IoHeartCircle size={40} color="black" style={IconStyle} />
          <SOuterWhiteCircleSpan>
            <SInnerBlackCircleSpan>
              <BsFillBookmarkFill size={16} color="white" />
            </SInnerBlackCircleSpan>
          </SOuterWhiteCircleSpan>
          <MdStars size={38} color="black" style={IconStyle} />
        </SIconWrapperDiv>
      </SWrapperDiv>
    </>
  );
};

export default IconDiv;
