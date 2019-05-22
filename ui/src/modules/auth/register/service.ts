import { store, bus } from "@/core";
import { actions } from "./store";
import * as shared from "@/shared";

export function register() {
  const {
    email,
    username,
    password,
    repeatPassword,
    promoCode,
    agreement
  } = store.getState().register;

  store.dispatch(actions.setLoading(true));

  bus.triggerServer(shared.events.SERVER_REGISTER_SUBMIT, {
    email,
    username,
    password,
    repeatPassword,
    promoCode,
    agreement
  });
}
