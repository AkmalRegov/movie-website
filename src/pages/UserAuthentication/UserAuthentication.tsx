import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserAccessContext } from "../../context/UserAccess/UserAccessContext";

type RouteParams = {
  uniqueId: string;
};

export const UserAuthentication: React.FC = () => {
  const { uniqueId } = useParams<RouteParams>();
  const { state: userAccess, dispatch: userAccessDispatch } = useContext(UserAccessContext);
  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <p>userAccess.requestToken is {userAccess.requestToken}</p>
        <p>Can try to request user access token!</p>
      </div>
    </>
  );
};
