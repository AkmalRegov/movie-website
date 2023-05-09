import React from "react";
import { useRouteError } from "react-router-dom";
import styled from "styled-components";

export type RouterError = {
  statusText: string;
  message: string;
};

const SErrorMainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouterError;
  console.error(error);

  return (
    <>
      <SErrorMainDiv>
        <SErrorDiv id="error-page">
          <h1>Oops!</h1>
          <p style={{ color: "black" }}>Sorry, an unexpected error has occurred.</p>
          <p style={{ color: "black" }}>
            <i>{error.statusText || error.message}</i>
          </p>
        </SErrorDiv>
      </SErrorMainDiv>
    </>
  );
};
