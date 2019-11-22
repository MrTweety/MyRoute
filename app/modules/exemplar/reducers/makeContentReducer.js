/*
 * w przyszłosci zmienie folder exemplar na common
 * app/components -> common/components
 */

export const makeContentReducer = (
  types,
  dataKey,
  mapResponseToStore = response => response
) => (state = {}, action) => {
  if (!types.includes(action.type)) {
    return state;
  }

  const keyValue = dataKey;
  if (!keyValue) {
    return state;
  }

  const keyState = {
    ...state[keyValue],
    data: null,
    isFetching: true,
    fetchedAt: null,
    error: null
  };

  switch (action.type) {
    case types[0]:
      return Object.assign(state, {
        ...keyState,
        isFetching: true,
        fetchingError: false,
        error: null
      });
    case types[1]:
      const data = mapResponseToStore(action.response, action);
      return Object.assign(state, {
        ...keyState,
        data,
        isFetching: false,
        fetchedAt: new Date().getTime(),
        fetchingError: false,
        error: null
      });

    case types[2]:
      return Object.assign(state, {
        data: false,
        isFetching: false,
        fetchingError: true,
        error: action.error,
        errorCode: action.errorCode
      });

    default:
      return state;
  }
};
