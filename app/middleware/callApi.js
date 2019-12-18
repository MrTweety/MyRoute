import { getSavedItem, SAVED_JWT_TOKEN } from "../services/secureStorage";

// const API_ROOT = "https://myroutet.azurewebsites.net";
const API_ROOT = "http://192.168.1.16:8080";

const queryString = params =>
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

// Fetches an API response, the result JSON .
const callApi = async (endpoint, data, method = "POST", headers = {}) => {
  let fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  const token = await getSavedItem(SAVED_JWT_TOKEN);

  let fetchData;
  if (method.toUpperCase() === "GET") {
    if (data) {
      fullUrl = fullUrl + "?" + queryString(data);
    }
    fetchData = fetch(fullUrl, {
      method,
      headers: {
        Authorization: "Bearer " + token,
        ...headers
      }
    });
  } else {
    fetchData = fetch(fullUrl, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,

        ...headers
      }
    });
  }

  return fetchData.then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
  );
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = "Call API";

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }
  // actionParams - dodawane do akcji, nie wysyłane w zapytaniu
  let { data, endpoint, method, headers, actionParams } = callAPI;
  const { types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }

  if (typeof method !== "string") {
    throw new Error("Specify a string method URL.");
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = payload => {
    const finalAction = Object.assign(
      {},
      action,
      payload,
      { actionParams },
      data
    );
    delete finalAction[CALL_API];
    return finalAction;
  };
  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));
  return callApi(endpoint, data, method, headers)
    .then(
      response =>
        next(
          actionWith(
            Object.assign({ response: response }, { type: successType })
          )
        ),
      error => next(actionWith(Object.assign(error, { type: failureType })))
    )
    .catch(error => next(actionWith({ type: failureType, error })));
};
