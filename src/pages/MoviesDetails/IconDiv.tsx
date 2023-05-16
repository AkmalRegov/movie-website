import React, { useContext, useEffect, useState } from "react";
import { GET_WATCHLIST, POST_ADD_TO_WATCHLIST, SEARCH_ONE_MOVIE } from "../../restapi";
import UserScoreFC from "./UserScoreFC";
import { IoHeartCircle, IoListCircleSharp } from "react-icons/io5";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import styled from "styled-components";
import { UserDetailsContext } from "../../context/UserDetails/UserDetailsContext";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";

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
  cursor: pointer;
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
  width: 32px;
  height: 32px;
  border: 1px solid white;
  border-radius: 50%;
`;

const STooltip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
`;

const STooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: white;
  color: black;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 34px;
`;

const STooltipWatchlist = styled(STooltip)``;
const STooltipWatchlistText = styled(STooltipText)`
  ${STooltipWatchlist}:hover & {
    visibility: visible;
  }
`;

const IconStyle = { backgroundColor: "white", borderRadius: "100%", cursor: "pointer" };

const IconDiv: React.FC<{
  movieData: object & { vote_average: number; id: number };
  res?: string;
  textColor?: string;
  movieInWatchlist?: boolean;
  account_id?: number;
  session_id?: string;
  setReturnWatchlist?: Function;
}> = ({
  movieData,
  res,
  textColor,
  movieInWatchlist,
  account_id,
  session_id,
  setReturnWatchlist,
}) => {
  const handleAddtoWatchlist = () => {
    console.log("movieInWatchlist is: ", movieInWatchlist);
    console.log("account_id is: ", account_id);
    console.log("session_id is: ", session_id);
    console.log("setReturnWatchlist is: ", setReturnWatchlist);
    if (
      movieInWatchlist === undefined ||
      account_id === undefined ||
      session_id === undefined ||
      setReturnWatchlist === undefined
    )
      return;
    if (movieInWatchlist) {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(
        account_id,
        session_id,
        movieData.id,
        false, //delete from watchlist
      ).then((data) => {
        console.log("data from post add to watchlist is: ", data);
        setReturnWatchlist();
      });
    } else {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(account_id, session_id, movieData.id).then(
        (data) => {
          console.log("data from post add to watchlist is: ", data);
          setReturnWatchlist();
        },
      );
    }
  };

  return (
    <>
      {res === "justScore" ? (
        <SWrapperDiv>
          <div>
            <UserScoreFC movieData={movieData} textColor={textColor} />
          </div>
        </SWrapperDiv>
      ) : (
        <SWrapperDiv>
          <div>
            <UserScoreFC movieData={movieData} />
          </div>
          <SIconWrapperDiv>
            <IoListCircleSharp size={40} color="black" style={IconStyle} />
            <IoHeartCircle size={40} color="black" style={IconStyle} />
            <SOuterWhiteCircleSpan onClick={handleAddtoWatchlist}>
              <SInnerBlackCircleSpan>
                {movieInWatchlist !== undefined && movieInWatchlist ? (
                  <STooltipWatchlist>
                    <BsFillBookmarkFill size={16} color="blue" />
                    <STooltipWatchlistText>Remove from your watchlist</STooltipWatchlistText>
                  </STooltipWatchlist>
                ) : (
                  <STooltipWatchlist>
                    <BsFillBookmarkFill size={16} color="white" />
                    {movieInWatchlist === false ? (
                      <STooltipWatchlistText>Add to your watchlist</STooltipWatchlistText>
                    ) : (
                      <STooltipWatchlistText>Login to add to your watchlist</STooltipWatchlistText>
                    )}
                  </STooltipWatchlist>
                )}
              </SInnerBlackCircleSpan>
            </SOuterWhiteCircleSpan>
            <MdStars size={38} color="black" style={IconStyle} />
          </SIconWrapperDiv>
        </SWrapperDiv>
      )}
    </>
  );
};

export default IconDiv;
