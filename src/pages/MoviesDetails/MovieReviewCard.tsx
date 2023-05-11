import React from "react";
import { GET_MOVIE_REVIEWS } from "../../restapi";
import { AiFillStar } from "react-icons/ai";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

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

const SReviewUrlAnchor = styled.a`
  text-decoration: none;
`;

const SReviewUrlStrong = styled.strong`
  color: black;
  font-size: 18px;

  &:hover {
    color: gray;
  }
`;

export const InitialAvatarCircleSpan: React.FC<{ username: string }> = ({ username }) => {
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

const SReviewContentDiv = styled.div`
  display: inline-block;
  padding-left: 96px;
  padding-right: 20px;
  padding-bottom: 20px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  max-height: 194px;
`;

const SFullReviewBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 94vw;
  height: fit-content;
  max-height: 20rem;
  padding-bottom: 4px;
  border: 1px solid black;
  border-radius: 12px;
  box-shadow: 5px 10px #888;
`;

const SReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SAuthorDiv = styled.div`
  display: flex;
  gap: 1rem;
  height: fit-content;
  align-items: center;
  padding: 16px;
`;

const SAuthorAnchor = styled.a`
  text-decoration: none;
  height: fit-content;
`;

const SAuthorProfileImg = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  border-radius: 50%;
`;

const SReviewRatingTimeStampDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const SReviewRatingDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SReviewRatingBoxDiv = styled.div`
  display: flex;
  background-color: black;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  width: 50px;
  padding: 2px;
  border-radius: 8px;
`;

const SReviewWrittenByDiv = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const SReviewWrittenByAnchor = styled.a`
  color: black;
  font-weight: 400;
  text-decoration: none;
`;

const SMarkdownP = styled.p`
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

const SAiFillStar = styled(AiFillStar)`
  position: relative;
  top: 1.4px;
`;

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

const MovieReviewCard: React.FC<{ fetchedMovieReviews: GET_MOVIE_REVIEWS.movieReview }> = ({
  fetchedMovieReviews,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "99vw" }}>
      {fetchedMovieReviews.results.map((item, index) => {
        // console.log("username is: ", item.author_details.username);
        return (
          <SFullReviewBoxDiv key={index}>
            <SReviewDiv style={{ display: "flex", flexDirection: "column" }}>
              <SAuthorDiv>
                {item.author_details.avatar_path ? (
                  <SAuthorAnchor
                    href={`https://www.themoviedb.org/u/${item.author_details.username}`}
                    target="_blank"
                  >
                    <SAuthorProfileImg
                      loading="lazy"
                      src={fetchAvatarImage(item.author_details.avatar_path as string)}
                      alt={`A picture of user ${item.author}`}
                    />
                  </SAuthorAnchor>
                ) : (
                  <InitialAvatarCircleSpan username={item.author_details.username} />
                )}
                <SReviewRatingTimeStampDiv>
                  <SReviewRatingDiv>
                    <SReviewUrlAnchor href={`${item.url}`} target="_blank">
                      <SReviewUrlStrong>A review by {item.author}</SReviewUrlStrong>
                    </SReviewUrlAnchor>
                    {item.author_details.rating && (
                      <SReviewRatingBoxDiv>
                        <SAiFillStar size={12} color="white" />
                        <p style={{ fontSize: "14px" }}>{item.author_details.rating}.0</p>
                      </SReviewRatingBoxDiv>
                    )}
                  </SReviewRatingDiv>
                  <SReviewWrittenByDiv>
                    <p style={{ color: "gray" }}>Written by</p>
                    <SReviewWrittenByAnchor
                      href={`https://www.themoviedb.org/u/${item.author_details.username}`}
                    >
                      {" "}
                      {item.author}
                    </SReviewWrittenByAnchor>
                    <p style={{ color: "gray" }}>on {parseDate(item.created_at)}</p>
                  </SReviewWrittenByDiv>
                </SReviewRatingTimeStampDiv>
              </SAuthorDiv>
              <SReviewContentDiv className="reviewContentBox">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    p: ({ node, ...props }) => <SMarkdownP {...props} />,
                    strong: ({ node, ...props }) => (
                      <strong style={{ color: "black" }} {...props} />
                    ),
                    em: ({ node, ...props }) => <em style={{ color: "black" }} {...props} />,
                  }}
                >
                  {item.content}
                </ReactMarkdown>
              </SReviewContentDiv>
            </SReviewDiv>
          </SFullReviewBoxDiv>
        );
      })}
    </div>
  );
};

export default MovieReviewCard;
