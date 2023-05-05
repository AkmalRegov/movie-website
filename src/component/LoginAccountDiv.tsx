import React, { useContext } from "react";
import { UserAccessContext } from "../context/UserAccess/UserAccessContext";
import styled from "styled-components";

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

const LoginAccountDiv: React.FC = () => {
  const { state: userAccessState, dispatch: userAccessDispatch } = useContext(UserAccessContext);
  return (
    <>
      <SLoginDiv>
        <p style={{ color: "black" }}>User details should be here!</p>
        <SLoginButton>Login</SLoginButton>
      </SLoginDiv>
    </>
  );
};

export default LoginAccountDiv;
