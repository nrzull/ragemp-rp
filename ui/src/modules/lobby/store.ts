interface TState {
  creator: boolean;
  selector: boolean;
}

const initialState: TState = {
  creator: false,
  selector: false
};

const types = {
  SET_CREATOR: "CHARACTER_LOBBY_SET_CREATOR",
  SET_SELECTOR: "CHARACTER_LOBBY_SET_SELECTOR"
};

const actions = {
  setCreator(payload: TState["creator"]) {
    return { type: types.SET_CREATOR, payload };
  },

  setSelector(payload: TState["selector"]) {
    return { type: types.SET_SELECTOR, payload };
  }
};

function reducer(state = initialState, { type, payload }): TState {
  switch (type) {
    case types.SET_CREATOR:
      return { ...state, creator: payload };

    case types.SET_SELECTOR:
      return { ...state, selector: payload };

    default:
      return state;
  }
}

export { actions, reducer, TState };
