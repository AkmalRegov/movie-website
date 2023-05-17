import React, { useEffect, useState } from "react";
import HomePageProvider from "../../context/HomePage/HomePageProvider";
import { TrendingMovies } from "./TrendingMovies";
import { DynamicRatings, OneStarRating } from "../../component";
import ReactStars from "react-rating-stars-component";

const MyReactStars: React.FC<{
  submittedRating: number;
  handleChangeRating: (new_rating: number) => void;
}> = ({ submittedRating, handleChangeRating }) => {
  return (
    <div>
      <ReactStars
        count={5}
        value={submittedRating}
        onChange={handleChangeRating}
        size={32}
        isHalf={true}
        activeColor={"#ffd700"}
      />
    </div>
  );
};

const HomeScreen: React.FC = () => {
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
    <>
      {/* <HomePageProvider>
        <TrendingMovies />
      </HomePageProvider> */}
      {/* <DynamicRatings /> */}
      {/* <OneStarRating /> */}
      <div
        onClick={() => {
          setSubmitRating(true);
        }}
      >
        {!submitRating && (
          <ReactStars
            count={5}
            value={submittedRating}
            onChange={handleChangeRating}
            size={32}
            isHalf={true}
            activeColor={"#ffd700"}
          />
        )}
        <p style={{ color: "black" }}>onChangeRating is now: {onChangeRating}</p>
        <p style={{ color: "black" }}>submittedRating is now: {submittedRating}</p>
        <button
          onClick={() => {
            setOnChangeRating(0);
            setSubmittedRating(0);
            setSubmitRating(false);
          }}
        >
          Reset rating
        </button>
      </div>
    </>
  );
};

export default HomeScreen;
