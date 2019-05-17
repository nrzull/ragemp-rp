const initialState = {
  show: false
};

const types = new (class {
  SHOW = "LOGIN_SHOW";
})();

const actions = new (class {
  show(payload) {
    return { type: types.SHOW, payload };
  }
})();

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SHOW:
      return { ...state, show: payload };

    default:
      return state;
  }
}

export { actions, reducer };
