import { userStateKey } from "../actions/getUserById";

export const returnUser = state => {
  const loginState = state[userStateKey];
  return loginState.data;
};
