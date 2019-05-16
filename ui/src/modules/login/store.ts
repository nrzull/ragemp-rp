interface State {
  show: boolean;
}

const initialState: State = {
  show: false
};

const types = new (class {
  SHOW = "LOGIN_SHOW";
})();

const actions = new (class {
  show(payload: State["show"]) {
    return { type: types.SHOW, payload };
  }
})();

function reducer(state = initialState, { type, payload }): State {
  switch (type) {
    case types.SHOW:
      return { ...state, show: payload };

    default:
      return state;
  }
}

export { State, actions, reducer };
