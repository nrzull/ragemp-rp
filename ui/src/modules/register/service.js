import { store, bus } from "@/core";
import { actions } from "./store";
import { shared } from "@/shared";

const Register = () => {
  const {
    email,
    username,
    password,
    repeatPassword,
    promoCode
  } = store.getState().register;

  store.dispatch(actions.setLoading(true));

  bus.triggerServer(shared.events.UI_REGISTER_SUBMIT, {
    email,
    username,
    password,
    repeatPassword,
    promoCode
  });
};

const service = { Register };

export { service };
