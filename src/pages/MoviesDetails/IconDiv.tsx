import React, { useState } from "react";
import { GET_ACCOUNT_STATE, POST_ADD_TO_WATCHLIST } from "../../restapi";
import UserScoreFC from "./UserScoreFC";
import { IoHeartCircle, IoListCircleSharp } from "react-icons/io5";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import styled from "styled-components";
import RatingModal from "../../component/RatingModal";
import { useOutsideClick } from "../../customHooks/useOutisdeClick";

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
  /* border-bottom: 1px dotted black; */
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
  top: -12px;
  left: 34px;
`;

const STooltipFavourite = styled(STooltip)``;
const STooltipFavouriteText = styled(STooltipText)`
  left: 50px;
  ${STooltipFavourite}:hover & {
    visibility: visible;
  }
`;

const SToolTipReactIconsText = styled(STooltipText)`
  top: 4px;
  left: 44px;
`;

const STooltipAddToList = styled(STooltip)``;
const STooltipAddToListText = styled(SToolTipReactIconsText)`
  ${STooltipAddToList}:hover & {
    visibility: visible;
  }
`;

const STooltipWatchlist = styled(STooltip)``;
const STooltipWatchlistText = styled(STooltipText)`
  top: -24px;
  ${STooltipWatchlist}:hover & {
    visibility: visible;
  }
`;

const STooltipRateStar = styled(STooltip)``;
const STooltipRateStarText = styled(SToolTipReactIconsText)`
  ${STooltipRateStar}:hover & {
    visibility: visible;
  }
`;

const IconStyle = { backgroundColor: "white", borderRadius: "100%", cursor: "pointer" };

const RateStarIcon: React.FC<{
  IconDivHandlerProps: IconDivHandlerProps | undefined;
  movie_id: number;
}> = ({ IconDivHandlerProps, movie_id }) => {
  const [showModal, setShowModal] = useState(false);

  const showRatingModal = (e: React.MouseEvent) => {
    setShowModal(!showModal);
    e?.stopPropagation();
  };

  const closeRatingModal = (e: React.MouseEvent) => {
    setShowModal(false);
    e?.stopPropagation();
  };

  const ref = useOutsideClick(closeRatingModal);

  return (
    <div ref={ref} onClick={showRatingModal}>
      {IconDivHandlerProps === undefined ? (
        <STooltipRateStar>
          <MdStars size={38} color="black" style={IconStyle} />
          <STooltipRateStarText>Login your account to rate movie</STooltipRateStarText>
        </STooltipRateStar>
      ) : (
        <STooltipRateStar>
          <MdStars size={38} color="black" style={IconStyle} />
          <STooltipRateStarText>Rate the movie</STooltipRateStarText>
          <RatingModal showModal={showModal} />
        </STooltipRateStar>
      )}
    </div>
  );
};

const AddToListIcon: React.FC<{
  IconDivHandlerProps: IconDivHandlerProps | undefined;
  movie_id: number;
}> = ({ IconDivHandlerProps, movie_id }) => {
  return (
    <div onClick={() => console.log("Should add to user's movie list")}>
      {IconDivHandlerProps === undefined ? (
        <STooltipAddToList>
          <IoListCircleSharp size={40} color="black" style={IconStyle} />
          <STooltipAddToListText>Login your account to add to list</STooltipAddToListText>
        </STooltipAddToList>
      ) : (
        <STooltipAddToList>
          <IoListCircleSharp size={40} color="black" style={IconStyle} />
          <STooltipAddToListText>Add to a list</STooltipAddToListText>
        </STooltipAddToList>
      )}
    </div>
  );
};

const AddToFavouriteIcon: React.FC<{
  IconDivHandlerProps: IconDivHandlerProps | undefined;
  movie_id: number;
}> = ({ IconDivHandlerProps, movie_id }) => {
  return (
    <div onClick={() => console.log("Should add to user's favourites")}>
      {IconDivHandlerProps === undefined ? (
        <STooltipFavourite>
          <IoHeartCircle size={40} color="black" style={IconStyle} />
          <STooltipFavouriteText>Login your account to add to favourite</STooltipFavouriteText>
        </STooltipFavourite>
      ) : (
        <STooltipFavourite>
          <IoHeartCircle size={40} color="black" style={IconStyle} />
          <STooltipFavouriteText>Add to favourites</STooltipFavouriteText>
        </STooltipFavourite>
      )}
    </div>
  );
};

const WatchlistIcon: React.FC<{
  IconDivHandlerProps: IconDivHandlerProps | undefined;
  movie_id: number;
}> = ({ IconDivHandlerProps, movie_id }) => {
  const handleAddtoWatchlist = () => {
    if (IconDivHandlerProps === undefined) return;
    const { userMovieState, account_id, session_id, fetchUserMovieState } = IconDivHandlerProps;
    if (
      userMovieState?.watchlist === undefined ||
      account_id === undefined ||
      session_id === undefined ||
      fetchUserMovieState === undefined
    )
      return;
    if (userMovieState.watchlist) {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(
        account_id,
        session_id,
        movie_id,
        false, //delete from watchlist
      ).then((data) => {
        console.log("data from post add to watchlist is: ", data);
        fetchUserMovieState();
      });
    } else {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(account_id, session_id, movie_id).then(
        (data) => {
          console.log("data from post add to watchlist is: ", data);
          fetchUserMovieState();
        },
      );
    }
  };

  return (
    <SOuterWhiteCircleSpan onClick={handleAddtoWatchlist}>
      <SInnerBlackCircleSpan>
        {IconDivHandlerProps?.userMovieState?.watchlist !== undefined &&
        IconDivHandlerProps?.userMovieState?.watchlist ? (
          <STooltipWatchlist>
            <BsFillBookmarkFill size={16} color="blue" />
            <STooltipWatchlistText>Remove from your watchlist</STooltipWatchlistText>
          </STooltipWatchlist>
        ) : (
          <STooltipWatchlist>
            <BsFillBookmarkFill size={16} color="white" />
            {IconDivHandlerProps?.userMovieState?.watchlist === false ? (
              <STooltipWatchlistText>Add to your watchlist</STooltipWatchlistText>
            ) : (
              <STooltipWatchlistText>Login to add to your watchlist</STooltipWatchlistText>
            )}
          </STooltipWatchlist>
        )}
      </SInnerBlackCircleSpan>
    </SOuterWhiteCircleSpan>
  );
};

interface IconDivHandlerProps {
  userMovieState?: GET_ACCOUNT_STATE.apiResponse;
  account_id?: number;
  session_id?: string;
  fetchUserMovieState?: Function;
}

const IconDiv: React.FC<{
  movieData: object & { vote_average: number; id: number };
  res?: string;
  textColor?: string;
  IconDivHandlerProps?: IconDivHandlerProps;
}> = ({ movieData, res, textColor, IconDivHandlerProps }) => {
  const handleAddtoWatchlist = () => {
    if (IconDivHandlerProps === undefined) return;
    const { userMovieState, account_id, session_id, fetchUserMovieState } = IconDivHandlerProps;
    console.log("userMovieState is: ", userMovieState);
    console.log("account_id is: ", account_id);
    console.log("session_id is: ", session_id);
    console.log("fetchUserMovieState is: ", fetchUserMovieState);
    console.log(
      "does userMovieState.rated.value exists?, answer: ",
      userMovieState?.rated.value ?? false,
    );
    if (
      userMovieState?.watchlist === undefined ||
      account_id === undefined ||
      session_id === undefined ||
      fetchUserMovieState === undefined
    )
      return;
    if (userMovieState.watchlist) {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(
        account_id,
        session_id,
        movieData.id,
        false, //delete from watchlist
      ).then((data) => {
        console.log("data from post add to watchlist is: ", data);
        fetchUserMovieState();
      });
    } else {
      POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(account_id, session_id, movieData.id).then(
        (data) => {
          console.log("data from post add to watchlist is: ", data);
          fetchUserMovieState();
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
            <AddToListIcon IconDivHandlerProps={IconDivHandlerProps} movie_id={movieData.id} />
            <AddToFavouriteIcon IconDivHandlerProps={IconDivHandlerProps} movie_id={movieData.id} />
            <WatchlistIcon IconDivHandlerProps={IconDivHandlerProps} movie_id={movieData.id} />
            <RateStarIcon IconDivHandlerProps={IconDivHandlerProps} movie_id={movieData.id} />
          </SIconWrapperDiv>
        </SWrapperDiv>
      )}
    </>
  );
};

export default IconDiv;
