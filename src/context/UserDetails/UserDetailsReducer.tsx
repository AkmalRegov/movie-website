import { GET_ACCOUNT_DETAILS } from "../../restapi";

export type UserDetailsState = GET_ACCOUNT_DETAILS.apiResponse;

export type UserDetailsActionTypes =
  | {
      type: "get account details";
      value: UserDetailsState;
    }
  | {
      type: "reset account details";
    };

export const UserDetailsReducer = (
  state: UserDetailsState,
  action: UserDetailsActionTypes,
): UserDetailsState => {
  switch (action.type) {
    case "get account details":
      return action.value;
    case "reset account details":
      return {
        ...state,
        avatar: { gravatar: { hash: "" }, tmdb: { avatar_path: "" } },
        id: -1,
        iso_639_1: "",
        iso_3166_1: "",
        name: "",
        include_adult: false,
        username: "",
      };
    default:
      return state;
  }
};
