import React from "react";
import MovieReviewCard from "./MovieReviewCard";
import { GET_MOVIE_REVIEWS } from "../../restapi";
import styled from "styled-components";

const SReviewsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const SFlexDiv = styled.div`
  display: flex;
`;

const SFlexColDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SMovieReviewNumberP = styled.p`
  color: gray;
  position: relative;
  font-weight: 500;
  top: 2.5px;
  left: 3px;
`;

const SMovieReviewNumberTextHr = styled.hr`
  height: 3px;
  width: 90px;
  color: black;
  background-color: black;
  margin: 0;
`;

const MovieReviewSection: React.FC<{ fetchedMovieReviews: GET_MOVIE_REVIEWS.movieReview }> = ({
  fetchedMovieReviews,
}) => {
  return (
    <>
      <section>
        <SReviewsContainerDiv>
          <SFlexDiv>
            <SFlexColDiv>
              <SFlexDiv>
                <h3>Reviews</h3>
                <SMovieReviewNumberP>{fetchedMovieReviews.total_results}</SMovieReviewNumberP>
              </SFlexDiv>
              <SMovieReviewNumberTextHr />
            </SFlexColDiv>
          </SFlexDiv>
          <div style={{ marginTop: "2rem" }}>
            <MovieReviewCard fetchedMovieReviews={fetchedMovieReviews} />
          </div>
        </SReviewsContainerDiv>
      </section>
    </>
  );
};

export default MovieReviewSection;
