import React, { useState, useEffect } from "react";
import { Rate } from "antd";
import styled from "styled-components";

const SRatingModalDiv = styled.div<RatingModalProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 10px;
  padding: 10px;
  border: 4px solid black;
  border-radius: 10px;
  background-color: whitesmoke;
  width: max-content;
  align-items: center;
  visibility: ${(props) => (props.showModal ? "visible" : "hidden")};
  position: absolute;
  z-index: 10;
`;

interface RatingModalProps {
  showModal?: boolean;
}

const RatingModal: React.FC<RatingModalProps> = ({ showModal = true }) => {
  const [submitRating, setSubmitRating] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [onChangeRating, setOnChangeRating] = useState(0);

  const handleChangeRating = (rating: number) => {
    console.log("rating value is: ", rating);
    setOnChangeRating(rating);
  };

  useEffect(() => {
    if (submitRating) {
      setSubmitRating(false);
      setSubmittedRating(onChangeRating);
    }
  }, [submitRating]);

  return (
    <SRatingModalDiv
      onClick={() => {
        setSubmitRating(true);
      }}
      showModal={showModal}
    >
      <div style={{ margin: "0" }}>
        <Rate allowHalf value={submittedRating} onChange={handleChangeRating} />
      </div>
      {/* <p style={{ color: "black" }}>onChangeRating is now: {onChangeRating}</p>
      <p style={{ color: "black" }}>submittedRating is now: {submittedRating}</p>
      <p style={{ color: "black" }}>Actual calculated score is now: {submittedRating * 2}</p> */}
      <button
        style={{ width: "max-content" }}
        onClick={() => {
          setOnChangeRating(0);
          setSubmittedRating(0);
          setSubmitRating(false);
        }}
      >
        Reset rating
      </button>
    </SRatingModalDiv>
  );
};

export default RatingModal;
