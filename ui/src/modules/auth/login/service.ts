import { store, bus } from "@/core";
import { actions } from "./store";
import * as shared from "@/shared";

export function logIn() {
  const { username, password, remember } = store.getState().login;

  store.dispatch(actions.setLoading(true));

  bus.triggerServer(shared.events.SERVER_LOGIN_SUBMIT, {
    username,
    password,
    remember
  });
}
