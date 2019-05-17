interface State {
  show: boolean;
  loading: boolean;
  username: string;
  password: string;
  remember: boolean;
}

const initialState: State = {
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
  setShow(payload: State["show"]) {
    return { type: types.SET_SHOW, payload };
  },

  setUsername(payload: State["username"]) {
    return { type: types.SET_USERNAME, payload };
  },

  setPassword(payload: State["password"]) {
    return { type: types.SET_PASSWORD, payload };
  },

  setRemember(payload: State["remember"]) {
    return { type: types.SET_REMEMBER, payload };
  }
};

function reducer(state = initialState, { type, payload }): State {
  switch (type) {
    case types.SET_SHOW:
      return { ...state, show: payload };

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

export { State, actions, reducer };
