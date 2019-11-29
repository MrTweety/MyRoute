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
      return {
        ...state,
        ...keyState,
        isFetching: true,
        fetchingError: false,
        error: null
      };
    case types[1]:
      const data = mapResponseToStore(action.response, action);
      return {
        ...keyState,
        data,
        isFetching: false,
        fetchedAt: new Date().getTime(),
        fetchingError: false,
        error: null
      };

    case types[2]:
      return {
        ...state,
        data: false,
        isFetching: false,
        fetchingError: true,
        error: action.error,
        errorCode: action.errorCode
      };

    default:
      return state;
  }
};
