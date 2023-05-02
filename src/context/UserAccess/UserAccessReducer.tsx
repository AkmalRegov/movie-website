export type UserAccessState = {
  requestToken: string;
  requestTokenApproved: boolean;
  uniqueKey: string;
  accessToken: string;
  sessionString: string;
};

export type UserAccessActionTypes =
  | { type: "initialize uniqueKey"; uniqueKey: string }
  | { type: "initialize requestToken"; requestToken: string }
  | {
      type: "error detected for determining requestTokenApproved";
      requestToken: "";
      accessToken: "";
      requestTokenApproved: false;
    }
  | { type: "set true for requestTokenApproved"; requestTokenApproved: true }
  | { type: "initialize accessToken"; accessToken: string }
  | { type: "set session from tmdb"; sessionString: string }
  | { type: "delete current session"; sessionString: "" };

export function UserAccessReducer(
  state: UserAccessState,
  action: UserAccessActionTypes,
): UserAccessState {
  switch (action.type) {
    case "initialize uniqueKey":
      return { ...state, uniqueKey: action.uniqueKey };
    case "initialize requestToken":
      return { ...state, requestToken: action.requestToken };
    case "error detected for determining requestTokenApproved":
      return {
        ...state,
        requestToken: action.requestToken,
        accessToken: action.accessToken,
        requestTokenApproved: action.requestTokenApproved,
      };
    case "set true for requestTokenApproved":
      return { ...state, requestTokenApproved: action.requestTokenApproved };
    case "initialize accessToken":
      return { ...state, accessToken: action.accessToken };
    case "set session from tmdb":
      return { ...state, sessionString: action.sessionString };
    case "delete current session":
      return { ...state, sessionString: action.sessionString };
    default:
      return state;
  }
}
