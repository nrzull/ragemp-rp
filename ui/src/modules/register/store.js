const initialState = {
  show: false,
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  promoCode: ""
};

const types = {
  SHOW: "REGISTER_SET_SHOW",
  SET_EMAIL: "REGISTER_SET_EMAIL",
  SET_USERNAME: "REGISTER_SET_USERNAME",
  SET_PASSWORD: "REGISTER_SET_PASSWORD",
  SET_REPEAT_PASSWORD: "REGISTER_SET_REPEAT_PASSWORD",
  SET_PROMO_CODE: "REGISTER_SET_PROMO_CODE"
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

    default:
      return state;
  }
}

export { actions, reducer };
