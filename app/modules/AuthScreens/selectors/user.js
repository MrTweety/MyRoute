import { userStateKey } from "../actions/getUserById";

export const returnUser = state => {
  const loginState = state[userStateKey];
  console.log("loginState", loginState);
  return loginState.data;
};
