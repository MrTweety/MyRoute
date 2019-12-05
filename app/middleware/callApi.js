const API_ROOT = "https://myroutet.azurewebsites.net";
// const API_ROOT = "http://192.168.1.14:8080";

// Fetches an API response, the result JSON .
const callApi = (endpoint, data, method = "POST", headers = {}) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  }).then(response =>
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

  let { data, endpoint, method, headers } = callAPI;
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
    const finalAction = Object.assign({}, action, payload);
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
