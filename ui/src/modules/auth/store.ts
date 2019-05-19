interface TState {
  show: boolean;
}

const initialState: TState = {
  show: false
};

const types = {
  SET_SHOW: "AUTH_SET_SHOW"
};

const actions = {
  setShow(payload: boolean) {
    return { type: types.SET_SHOW, payload };
  }
};

function reducer(state = initialState, { type, payload }): TState {
  switch (type) {
    case types.SET_SHOW:
      return { ...state, show: payload };

    default:
      return state;
  }
}

export { reducer, actions, TState };
