import React, { useCallback, useContext, useState } from "react";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";
import styled from "styled-components";
import {
  CREATE_ACCESS_TOKEN,
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION_WITH_ACCESS_TOKEN,
  GET_ACCOUNT_DETAILS,
} from "../../restapi";

const SLoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const SLoginButton = styled.button`
  border: 1px solid green;
  background-color: green;
  border-radius: 4rem;
  width: 5rem;
  height: 3rem;
  color: white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SInitialAvatarCircleSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  width: 32px;
  height: 32px;
  font-size: 14px;
  color: #fff;
  background-color: blue;
  border-radius: 50%;
  border: 1px solid blue;
  box-shadow: 4px 2px #888;
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

export const LoginAccountDiv: React.FC = () => {
  const { state: userAccessState, dispatch: userAccessDispatch } = useContext(UserAccessContext);
  //   const [accountDetails, setAccountDetails] = useState({} as GET_ACCOUNT_DETAILS.apiResponse);
  const [accountDetails, setAccountDetails] = useState<GET_ACCOUNT_DETAILS.apiResponse>({
    avatar: {
      gravatar: {
        hash: "35e84f36cd0a1c2818fa6cf8019f91a7",
      },
      tmdb: {
        avatar_path: null,
      },
    },
    id: 18689211,
    iso_639_1: "en",
    iso_3166_1: "MY",
    name: "",
    include_adult: false,
    username: "AkmalAnuar",
  });

  async function handleCreateRequestTokenV4(uniqueString: string) {
    CREATE_REQUEST_TOKEN.tmdb_postCreateRequestTokenV4(uniqueString).then(
      (data: CREATE_REQUEST_TOKEN.apiResponse) => {
        console.log("data from node request here is: ", data);
        userAccessDispatch({ type: "initialize requestToken", requestToken: data.request_token });
        window
          .open(
            `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
            "_blank",
          )
          ?.focus();
        return data;
      },
    );
  }

  async function handleCreateUserAccessTokenV4(uniqueString: string, request_token: string) {
    var accessTokenResponseWithData = {} as CREATE_ACCESS_TOKEN.apiResponse;
    var accountDetailsArgs = {} as CREATE_SESSION_WITH_ACCESS_TOKEN.apiResponse;

    accessTokenResponseWithData = await CREATE_ACCESS_TOKEN.tmdb_postCreateAccessTokenV4(
      uniqueString,
      request_token,
    )
      .then((data: CREATE_ACCESS_TOKEN.apiResponse) => {
        console.log("data is: ", data);
        userAccessDispatch({ type: "initialize accessToken", accessToken: data.access_token });
        userAccessDispatch({
          type: "set true for requestTokenApproved",
          requestTokenApproved: true,
        });
        return data;
      })
      .catch();

    if (accessTokenResponseWithData) {
      console.log("accessTokenResponseWithData is:\n", accessTokenResponseWithData);
      accountDetailsArgs = await CREATE_SESSION_WITH_ACCESS_TOKEN.tmdb_createSessionWithAccessToken(
        userAccessState.uniqueKey,
        accessTokenResponseWithData.access_token,
      ).then((data) => {
        console.log("session data is: ", data);
        userAccessDispatch({ type: "set session from tmdb", sessionString: data.session_id });
        return data;
      });
    }

    if (accountDetailsArgs) {
      GET_ACCOUNT_DETAILS.tmdb_getAccountDetails(accountDetailsArgs.session_id).then((data) => {
        console.log("account details retrieved are:\n", data);
        setAccountDetails(data);
      });
    }
  }

  const resolveRenderConditionals = useCallback(() => {
    switch (true) {
      case userAccessState.requestToken === "" && userAccessState.accessToken === "":
        return (
          <>
            <p style={{ color: "black" }}>User details should be here!</p>
            <SLoginButton onClick={() => handleCreateRequestTokenV4("test")}>Login</SLoginButton>
          </>
        );
      case userAccessState.requestToken !== "" && userAccessState.accessToken === "":
        return (
          <>
            <p style={{ color: "black" }}>Have you approved request from TMDB?</p>
            <button
              onClick={() => handleCreateUserAccessTokenV4("test", userAccessState.requestToken)}
            >
              Yes
            </button>
            <button
              onClick={() => {
                userAccessDispatch({ type: "initialize requestToken", requestToken: "" });
                alert("Please try authorize the request again!");
              }}
            >
              No
            </button>
          </>
        );
      case userAccessState.requestToken !== "" && userAccessState.accessToken !== "":
        return (
          <>
            {accountDetails?.avatar?.tmdb?.avatar_path !== null ? (
              <a
                href={`https://www.themoviedb.org/u/${accountDetails.username}`}
                target="_blank"
                style={{ textDecoration: "none", height: "fit-content" }}
              >
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w32_and_h32_face${accountDetails?.avatar?.tmdb?.avatar_path}`}
                  alt={`A picture of user ${accountDetails.username}`}
                  style={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    border: "1px solid black",
                    boxShadow: "5px 2px #888",
                  }}
                />
              </a>
            ) : (
              <InitialAvatarCircleSpan username={accountDetails.username} />
            )}
            <p style={{ color: "black" }}>{accountDetails.username}</p>
            <button
              onClick={() => {
                // userAccessDispatch({ type: "delete current session" });
              }}
            >
              Log Out
            </button>
          </>
        );
      default:
        return <></>;
    }
  }, [userAccessState.requestToken, userAccessState.accessToken]);

  return (
    <>
      <SLoginDiv>{resolveRenderConditionals()}</SLoginDiv>
    </>
  );
};
