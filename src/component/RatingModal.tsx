import React, { useState, useEffect, useRef, LegacyRef } from "react";
import { Rate } from "antd";
import styled from "styled-components";
import { IconDivHandlerProps } from "../pages/MoviesDetails/IconDiv";
import { DELETE_MOVIE_RATING, POST_MOVIE_RATING } from "../restapi";

const SRatingModalDiv = styled.div<RatingModalProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 10px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 10px;
  background-color: lightcyan;
  width: max-content;
  align-items: center;
  visibility: ${(props) => (props.showModal ? "visible" : "hidden")};
  position: absolute;
  z-index: 10;
`;

interface RatingModalProps {
  showModal?: boolean;
  fetchedUserRating?: number;
  setTempRating?: React.Dispatch<React.SetStateAction<number>>;
  IconDivHandlerProps?: IconDivHandlerProps;
  movie_id?: number;
}

const RatingModal: React.FC<RatingModalProps> = ({
  showModal = true,
  fetchedUserRating,
  setTempRating,
  IconDivHandlerProps,
  movie_id,
}) => {
  const [submitRating, setSubmitRating] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [onChangeRating, setOnChangeRating] = useState(0);
  const tempClosedRating = 0;
  const starRef = useRef<HTMLDivElement>();

  const handleChangeRating = (rating: number) => {
    console.log("rating value is: ", rating);
    setOnChangeRating(rating);
  };

  useEffect(() => {
    if (fetchedUserRating && fetchedUserRating > 0) {
      setSubmittedRating(fetchedUserRating / 2);
    }
  }, [fetchedUserRating]);

  useEffect(() => {
    console.log("fetchedUserRating is: ", fetchedUserRating);
    if (submitRating) {
      setSubmitRating(false);
      setSubmittedRating(onChangeRating > 0 ? onChangeRating : submittedRating);
    }
    if (submittedRating > 0 && fetchedUserRating !== submittedRating) {
      if (IconDivHandlerProps && movie_id) {
        if (!IconDivHandlerProps.session_id) return;
        if (!IconDivHandlerProps.fetchUserMovieState) return;
        if (setTempRating === undefined) return;
        const { userMovieState, fetchUserMovieState, account_id, session_id } = IconDivHandlerProps;
        console.log("submittedRating is: ", submittedRating);
        console.log("movie_id is: ", movie_id);
        console.log("session_id is: ", session_id);
        POST_MOVIE_RATING.tmdb_postMovieRatings(submittedRating * 2, movie_id, session_id)
          .then((res) => res.json())
          .then((data) => {
            console.log("Post movie rating data: ", data);
            setTimeout(() => fetchUserMovieState(), 800);
            setTempRating(submittedRating * 2);
          });
      }
    }
  }, [submitRating]);

  const handleButtonClick = () => {
    setOnChangeRating(0);
    setSubmittedRating(0);
    setSubmitRating(false);
    console.log("IconDivHandlerProps is: ", IconDivHandlerProps);
    if (IconDivHandlerProps !== undefined && movie_id) {
      if (!IconDivHandlerProps.session_id) return;
      if (!IconDivHandlerProps.fetchUserMovieState) return;
      if (setTempRating === undefined) return;
      const { userMovieState, fetchUserMovieState, account_id, session_id } = IconDivHandlerProps;
      setSubmittedRating(0);
      DELETE_MOVIE_RATING.tmdb_deleteMovieRatings(movie_id, session_id)
        .then((res) => res.json())
        .then((data) => {
          console.log("Delete movie rating data: ", data);
          setTimeout(() => fetchUserMovieState(), 800);
          setTempRating(0);
        });
    }
  };

  return (
    <SRatingModalDiv
      onClick={(e) => {
        if (starRef.current && starRef.current.contains(e.target as HTMLElement)) {
          setSubmitRating(true);
        }
      }}
      showModal={showModal}
    >
      <div style={{ margin: "0" }} ref={starRef as LegacyRef<HTMLDivElement>}>
        <Rate
          allowHalf
          value={showModal ? submittedRating : tempClosedRating}
          onChange={handleChangeRating}
        />
      </div>
      <button style={{ width: "max-content" }} onClick={handleButtonClick}>
        Reset rating
      </button>
    </SRatingModalDiv>
  );
};

export default RatingModal;
