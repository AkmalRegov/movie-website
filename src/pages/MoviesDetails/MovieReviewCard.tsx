import React from "react";
import { GET_MOVIE_REVIEWS } from "../../restapi";
import styled from "styled-components";

const SInitialAvatarCircleSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  width: 64px;
  height: 64px;
  font-size: 28px;
  color: #fff;
  background-color: blue;
  border-radius: 50%;
`;

const InitialAvatarCircleSpan: React.FC<{ username: string }> = ({ username }) => {
  return (
    <a
      href={`https://www.themoviedb.org/u/${username}`}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <SInitialAvatarCircleSpan>{username[0]}</SInitialAvatarCircleSpan>
    </a>
  );
};

const MovieReviewCard: React.FC<{ fetchedMovieReviews: GET_MOVIE_REVIEWS.movieReview }> = ({
  fetchedMovieReviews,
}) => {
  function parseDate(dateString: string) {
    var parts = dateString.split("-") as string[];
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    var longMonthName = mydate.toLocaleString("default", { month: "long" });
    var res = mydate.toDateString().split(" ");
    var unknownDate = res.filter((ele) => {
      if (ele === "Invalid") return true;
    });
    if (unknownDate.length > 0) return "";
    var resString = `${longMonthName} ${res[2]}, ${res[3]}`;
    return resString;
  }
  function fetchAvatarImage(avatar_path: string) {
    return RegExp("https://secure.gravatar.com/avatar").test(`${avatar_path}` as string)
      ? `${avatar_path?.replace("/", "")}?s=128`
      : `https://image.tmdb.org/t/p/w64_and_h64_face${avatar_path}`;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {fetchedMovieReviews.results.map((item, index) => {
        // console.log("username is: ", item.author_details.username);
        return (
          <div
            style={{ display: "flex", width: "94vw", height: "20rem", border: "1px solid black" }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              {item.author_details.avatar_path ? (
                <a
                  href={`https://www.themoviedb.org/u/${item.author_details.username}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <img
                    loading="lazy"
                    src={fetchAvatarImage(item.author_details.avatar_path as string)}
                    alt={`A picture of user ${item.author}`}
                    style={{
                      display: "block",
                      width: "64px",
                      height: "64px",
                      boxSizing: "border-box",
                      borderRadius: "50%",
                    }}
                  />
                </a>
              ) : (
                <InitialAvatarCircleSpan username={item.author_details.username} />
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <strong style={{ color: "black", fontSize: "18px" }}>
                    A review by {item.author}
                  </strong>
                  {item.author_details.rating && (
                    <em style={{ color: "black" }}>Rating given is {item.author_details.rating}</em>
                  )}
                </div>
                <div>
                  <p style={{ color: "gray", display: "flex", gap: "0.2rem" }}>
                    Written by<p style={{ color: "black", fontWeight: 400 }}> {item.author}</p> on{" "}
                    {parseDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MovieReviewSection: React.FC<{ fetchedMovieReviews: GET_MOVIE_REVIEWS.movieReview }> = ({
  fetchedMovieReviews,
}) => {
  return (
    <>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            marginBottom: "100px",
            marginLeft: "20px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <h3>Reviews</h3>
                <p
                  style={{
                    color: "gray",
                    position: "relative",
                    fontWeight: 500,
                    top: 2.5,
                    left: 3,
                  }}
                >
                  {fetchedMovieReviews.total_results}
                </p>
              </div>
              <hr
                style={{
                  height: "3px",
                  width: "90px",
                  color: "black",
                  backgroundColor: "black",
                  margin: 0,
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <MovieReviewCard fetchedMovieReviews={fetchedMovieReviews} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieReviewSection;
