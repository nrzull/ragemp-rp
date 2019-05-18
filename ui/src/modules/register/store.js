const initialState = {
  show: false,
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  promoCode: "",
  loading: false,
  errors: {
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  }
};

const types = {
  SHOW: "REGISTER_SET_SHOW",
  SET_EMAIL: "REGISTER_SET_EMAIL",
  SET_USERNAME: "REGISTER_SET_USERNAME",
  SET_PASSWORD: "REGISTER_SET_PASSWORD",
  SET_REPEAT_PASSWORD: "REGISTER_SET_REPEAT_PASSWORD",
  SET_PROMO_CODE: "REGISTER_SET_PROMO_CODE",
  SET_LOADING: "REGISTER_SET_LOADING",
  SET_ERRORS: "REGISTER_SET_ERRORS"
};

const actions = {
  show(payload) {
    return { type: types.SHOW, payload };
  },

  setEmail(payload) {
    return { type: types.SET_EMAIL, payload };
  },

  setUsername(payload) {
    return { type: types.SET_USERNAME, payload };
  },

  setPassword(payload) {
    return { type: types.SET_PASSWORD, payload };
  },

  setRepeatPassword(payload) {
    return { type: types.SET_REPEAT_PASSWORD, payload };
  },

  setPromoCode(payload) {
    return { type: types.SET_PROMO_CODE, payload };
  },

  setLoading(payload) {
    return { type: types.SET_LOADING, payload };
  },

  setErrors(payload) {
    return { type: types.SET_ERRORS, payload };
  }
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.SHOW:
      return { ...state, show: payload };
    case types.SET_EMAIL:
      return { ...state, email: payload };
    case types.SET_USERNAME:
      return { ...state, username: payload };
    case types.SET_PASSWORD:
      return { ...state, password: payload };
    case types.SET_REPEAT_PASSWORD:
      return { ...state, repeatPassword: payload };
    case types.SET_PROMO_CODE:
      return { ...state, promoCode: payload };
    case types.SET_LOADING:
      return { ...state, loading: payload };
    case types.SET_ERRORS:
      return { ...state, errors: payload };

    default:
      return state;
  }
}

export { actions, reducer };
