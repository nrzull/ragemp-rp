import { bus, store } from "@/core";
import { shared } from "@/shared";
import { actions } from "@/modules/register/store";
import * as login from "@/modules/login";

bus.on(shared.events.UI_REGISTER_SHOW, payload => {
  store.dispatch(actions.show(payload));
});

bus.on(shared.events.UI_REGISTER_SUBMIT_OK, () => {
  const { username, password } = store.getState().register;

  store.dispatch(login.actions.setUsername(username));
  store.dispatch(login.actions.setPassword(password));
  store.dispatch(login.actions.setRemember(true));
  store.dispatch(actions.setErrors({}));
  store.dispatch(login.actions.setErrors({}));

  store.dispatch(actions.setShow(false));
  store.dispatch(login.actions.setShow(true));

  login.service.logIn();
});

bus.on(shared.events.UI_REGISTER_SUBMIT_ERROR, payload => {
  store.dispatch(actions.setErrors(payload));
  store.dispatch(actions.setLoading(false));
});
