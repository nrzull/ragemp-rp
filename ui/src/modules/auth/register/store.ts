interface TState {
  show: boolean;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  promoCode: string;
  agreement: boolean;
  loading: boolean;
  errors: {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    promoCode: string;
    agreement: string;
  };
}

const initialState: TState = {
  show: false,
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  promoCode: "",
  agreement: false,
  loading: false,
  errors: {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    promoCode: "",
    agreement: ""
  }
};

const types = {
  SET_SHOW: "REGISTER_SET_SHOW",
  SET_EMAIL: "REGISTER_SET_EMAIL",
  SET_USERNAME: "REGISTER_SET_USERNAME",
  SET_PASSWORD: "REGISTER_SET_PASSWORD",
  SET_REPEAT_PASSWORD: "REGISTER_SET_REPEAT_PASSWORD",
  SET_AGREEMENT: "REGISTER_SET_AGREEMENT",
  SET_PROMO_CODE: "REGISTER_SET_PROMO_CODE",
  SET_LOADING: "REGISTER_SET_LOADING",
  SET_ERRORS: "REGISTER_SET_ERRORS"
};

const actions = {
  setShow(payload) {
    return { type: types.SET_SHOW, payload };
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

  setAgreement(payload) {
    return { type: types.SET_AGREEMENT, payload };
  },

  setErrors(payload) {
    return { type: types.SET_ERRORS, payload };
  }
};

function reducer(state = initialState, { type, payload }): TState {
  switch (type) {
    case types.SET_SHOW:
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

    case types.SET_AGREEMENT:
      return { ...state, agreement: payload };

    case types.SET_ERRORS:
      return { ...state, errors: payload };

    default:
      return state;
  }
}

export { actions, reducer, TState };
