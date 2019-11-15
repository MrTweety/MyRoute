const API_ROOT = "https://myroutet.azurewebsites.net";

// Fetches an API response, the result JSON .
const callApi = (endpoint, fetchParams) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, { ...fetchParams }).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return Object.assign({}, json);
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

  let { endpoint } = callAPI;
  const { types, fetchParams } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(
    actionWith({
      type: requestType,
      isFetching: true,
      isFetch: false,
      error: null
    })
  );
  return callApi(endpoint, fetchParams).then(
    response =>
      next(
        actionWith({
          type: successType,
          data: response.data,
          isFetching: false,
          isFetch: true,
          error: null,
          lastUpdated: new Date().getTime()
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          isFetching: false,
          isFetch: false,
          error: error.message || "Something bad happened"
          // lastUpdated: new Date().getTime()
        })
      )
  );
};
