import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserDetailsContext } from "../../context/UserDetails/UserDetailsContext";
import * as GET_WATCHLIST from "../../restapi/tmdb_get-watchlist";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";
import IconDiv from "../MoviesDetails/IconDiv";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoListCircleSharp, IoHeartCircle } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { POST_ADD_TO_WATCHLIST } from "../../restapi";

const SIconWrapperDiv = styled.div`
  display: flex;
  gap: 0.5rem;
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

const SReviewUrlAnchor = styled.a`
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: blue;
  }
`;

const SReviewUrlStrong = styled.strong`
  color: black;
  font-size: 18px;

  &:hover {
    color: gray;
  }
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

const SReviewsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const SFlexDiv = styled.div`
  display: flex;
  gap: 0.5rem;
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
  width: 110px;
  color: black;
  background-color: black;
  margin: 0;
`;

const SFullReviewBoxDiv = styled.div`
  display: flex;
  width: 94vw;
  height: 200px;
  max-height: 20rem;
  /* border: 1px solid #d3d3d3; */
  border-radius: 8px;
  box-shadow: 0px 2px 8px #d3d3d3;
  box-sizing: border-box;
  /* white-space: "pre-wrap";
  overflow: "hidden";
  text-overflow: "ellipsis"; */
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
  right: 34px;
`;

const STooltipWatchlist = styled(STooltip)``;
const STooltipWatchlistText = styled(STooltipText)`
  ${STooltipWatchlist}:hover & {
    visibility: visible;
  }
`;

const IconStyle = { backgroundColor: "white", borderRadius: "100%", cursor: "pointer" };

const DummyCard: React.FC<{ movieData: object & { vote_average: number; id: number } }> = ({
  movieData,
}) => {
  return (
    <>
      <SFullReviewBoxDiv>
        <img
          src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/62HCnUTziyWcpDaBO2i1DX17ljH.jpg"
          alt="Poster image of Top Gun Maverick"
          style={{ borderRadius: "8px 0px 0px 8px", zIndex: 10 }}
          width={133}
          height={200}
        />
        <div
          style={{
            border: "1px solid #D3D3D3",
            borderRadius: "0px 8px 8px 0px",
            height: "200px",
            width: "94vw",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                bottom: "16px",
              }}
            >
              <IconDiv movieData={movieData} res="justScore" textColor="black" />
              <SReviewRatingTimeStampDiv>
                <SReviewRatingDiv>
                  <SReviewUrlAnchor
                    href={`https://www.themoviedb.org/movie/361743`}
                    target="_blank"
                    style={{ fontSize: "20px" }}
                  >
                    Top Gun: Maverick
                  </SReviewUrlAnchor>
                </SReviewRatingDiv>
                <SReviewWrittenByDiv>
                  <p style={{ color: "gray" }}>May 24, 2022</p>
                </SReviewWrittenByDiv>
              </SReviewRatingTimeStampDiv>
            </div>
            <SIconWrapperDiv style={{ position: "relative", bottom: "20px", right: "10px" }}>
              <IoListCircleSharp size={40} color="black" style={IconStyle} />
              <IoHeartCircle size={40} color="black" style={IconStyle} />
              <SOuterWhiteCircleSpan>
                <SInnerBlackCircleSpan>
                  <BsFillBookmarkFill size={16} color="white" />
                </SInnerBlackCircleSpan>
              </SOuterWhiteCircleSpan>
              <MdStars size={38} color="black" style={IconStyle} />
            </SIconWrapperDiv>
          </div>
          <div
            style={{
              display: "inline-block",
              marginLeft: "8px",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <p
              style={{
                color: "black",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              After more than thirty years of service as one of the Navy's top aviators, and dodging
              the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself
              training a detachment of TOP GUN graduates for a specialized mission the likes of
              which no living pilot has ever seen.
            </p>
          </div>
        </div>
      </SFullReviewBoxDiv>
    </>
  );
};

const WatchlistCard: React.FC<{
  movieData: object & {
    id: number;
    vote_average: number;
    backdrop_path: string;
    title: string;
    release_date: string;
    overview: string;
  };
  account_id: number;
  session_id: string;
  setReturnWatchlist: Function;
}> = ({ movieData, account_id, session_id, setReturnWatchlist }) => {
  const handleDeleteFromWatchlist = () => {
    POST_ADD_TO_WATCHLIST.tmdb_postAddToWatchlist(account_id, session_id, movieData.id, false).then(
      (data) => {
        console.log("data from post add to watchlist is: ", data);
        setReturnWatchlist();
      },
    );
  };

  return (
    <>
      <SFullReviewBoxDiv>
        <a href={`https://www.themoviedb.org/movie/${movieData.id}`} target="_blank">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieData.backdrop_path}`}
            alt={`Poster image of ${movieData.title}`}
            style={{ borderRadius: "8px 0px 0px 8px", zIndex: 10, cursor: "pointer" }}
            width={133}
            height={200}
          />
        </a>
        <div
          style={{
            borderRadius: "0px 8px 8px 0px",
            height: "200px",
            width: "94vw",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                bottom: "16px",
              }}
            >
              <IconDiv movieData={movieData} res="justScore" textColor="black" />
              <SReviewRatingTimeStampDiv>
                <SReviewRatingDiv>
                  <SReviewUrlAnchor
                    href={`https://www.themoviedb.org/movie/${movieData.id}`}
                    target="_blank"
                    style={{ fontSize: "20px" }}
                  >
                    {movieData.title}
                  </SReviewUrlAnchor>
                </SReviewRatingDiv>
                <SReviewWrittenByDiv>
                  <p style={{ color: "gray" }}>{movieData.release_date}</p>
                </SReviewWrittenByDiv>
              </SReviewRatingTimeStampDiv>
            </div>
            <SIconWrapperDiv style={{ position: "relative", bottom: "20px", right: "10px" }}>
              <IoListCircleSharp size={40} color="black" style={IconStyle} />
              <IoHeartCircle size={40} color="black" style={IconStyle} />
              <SOuterWhiteCircleSpan onClick={handleDeleteFromWatchlist}>
                <SInnerBlackCircleSpan>
                  <STooltipWatchlist>
                    <BsFillBookmarkFill size={16} color="blue" />
                    <STooltipWatchlistText>Remove from your watchlist</STooltipWatchlistText>
                  </STooltipWatchlist>
                </SInnerBlackCircleSpan>
              </SOuterWhiteCircleSpan>
              <MdStars size={38} color="black" style={IconStyle} />
            </SIconWrapperDiv>
          </div>
          <div
            style={{
              display: "inline-block",
              marginLeft: "8px",
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <p
              style={{
                color: "black",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "64px",
              }}
            >
              {movieData.overview}
            </p>
          </div>
        </div>
      </SFullReviewBoxDiv>
    </>
  );
};

export const Watchlist: React.FC = () => {
  const { state: userDetails, dispatch: userDetailsDispatch } = useContext(UserDetailsContext);
  const { state: userAccessState } = useContext(UserAccessContext);
  const { tmdb_getWatchlist } = GET_WATCHLIST;
  const [userWatchlist, setUserWatchlist] = useState({} as GET_WATCHLIST.Watchlist);
  const callOnce = useRef(false);
  // const movieData = {
  //   adult: false,
  //   backdrop_path: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
  //   genre_ids: [28, 18],
  //   id: 361743,
  //   original_language: "en",
  //   original_title: "Top Gun: Maverick",
  //   overview:
  //     "After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
  //   popularity: 274.488,
  //   poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
  //   release_date: "2022-05-24",
  //   title: "Top Gun: Maverick",
  //   video: false,
  //   vote_average: 8.29,
  //   vote_count: 6792,
  // };

  const returnWatchlist = async (page: number): Promise<GET_WATCHLIST.Watchlist> => {
    return tmdb_getWatchlist(userDetails?.id, userAccessState?.sessionString, page).then((data) => {
      // console.log("watchlist data is: ", data);
      return data;
    });
  };

  const loopReturnWatchlist = async (): Promise<GET_WATCHLIST.Watchlist> => {
    var data: GET_WATCHLIST.Watchlist = {} as GET_WATCHLIST.Watchlist;
    var page = 1;
    var temp_res = await returnWatchlist(page);
    data = temp_res;
    while (temp_res.total_pages > page) {
      page += 1;
      temp_res = await returnWatchlist(page);
      temp_res.results.forEach((ele) => {
        data.results.push(ele);
      });
    }
    return data;
  };

  const setReturnWatchlist = async () => {
    loopReturnWatchlist().then((data) => {
      console.log("watchlist data is: ", data);
      setUserWatchlist(data);
    });
  };

  useEffect(() => {
    if (userDetails?.username != "" && !callOnce.current) {
      setReturnWatchlist();
      callOnce.current = true;
    }
  }, [userWatchlist]);

  return (
    <>
      <section>
        <SReviewsContainerDiv>
          <SFlexDiv>
            <SFlexColDiv>
              <SFlexDiv>
                <h3>Watchlist</h3>
                <SMovieReviewNumberP>{userWatchlist?.results?.length}</SMovieReviewNumberP>
              </SFlexDiv>
              <SMovieReviewNumberTextHr />
            </SFlexColDiv>
          </SFlexDiv>
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>Movie watchlist here!</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {userWatchlist?.results?.length > 0 &&
              userWatchlist.results.map((ele, index) => {
                return (
                  <WatchlistCard
                    key={index}
                    movieData={ele}
                    account_id={userDetails?.id}
                    session_id={userAccessState?.sessionString}
                    setReturnWatchlist={setReturnWatchlist}
                  />
                );
              })}
            {/* <DummyCard movieData={movieData} /> */}
          </div>
        </SReviewsContainerDiv>
      </section>
    </>
  );
};
