const initialState = {
  show: false,
  loading: false,
  username: "",
  password: "",
  remember: false
};

const types = {
  SET_SHOW: "LOGIN_SET_SHOW",
  SET_LOADING: "LOGIN_SET_LOADING",
  SET_USERNAME: "LOGIN_SET_USERNAME",
  SET_PASSWORD: "LOGIN_SET_PASSWORD",
  SET_REMEMBER: "LOGIN_SET_REMEMBER"
};

const actions = {
  setShow(payload) {
    return { type: types.SET_SHOW, payload };
  },

  setLoading(payload) {
    return { type: types.SET_LOADING, payload };
  },

  setUsername(payload) {
    return { type: types.SET_USERNAME, payload };
  },

  setPassword(payload) {
    return { type: types.SET_PASSWORD, payload };
  },

  setRemember(payload) {
    return { type: types.SET_REMEMBER, payload };
  }
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SET_SHOW:
      return { ...state, show: payload };

    case types.SET_LOADING:
      return { ...state, loading: payload };

    case types.SET_USERNAME:
      return { ...state, username: payload };

    case types.SET_PASSWORD:
      return { ...state, password: payload };

    case types.SET_REMEMBER:
      return { ...state, remember: payload };

    default:
      return state;
  }
}

export { actions, reducer };
