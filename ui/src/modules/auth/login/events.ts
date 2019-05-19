import { bus, store } from "@/core";
import * as shared from "@/shared";
import { actions } from "@/modules/auth/login/store";
import * as auth from "@/modules/auth/store";

bus.on(shared.events.UI_LOGIN_SHOW, payload => {
  store.dispatch(actions.setShow(payload));
});

bus.on(shared.events.UI_LOGIN_SUBMIT_OK, () => {
  store.dispatch(actions.setShow(false));
  store.dispatch(auth.actions.setShow(false));
});

bus.on(shared.events.UI_LOGIN_SUBMIT_ERROR, payload => {
  store.dispatch(actions.setLoading(false));
  store.dispatch(actions.setErrors(payload));
});

bus.on(shared.events.UI_LOGIN_CREDENTIALS_GET, payload => {
  if (!payload) return;

  store.dispatch(actions.setUsername(payload.username));
  store.dispatch(actions.setPassword(payload.password));
  store.dispatch(actions.setRemember(true));
});
