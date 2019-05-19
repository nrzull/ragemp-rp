import { bus, store } from "@/core";
import * as shared from "@/shared";
import { actions } from "./store";
import { actions as loginActions } from "./login";

bus.on(shared.events.UI_AUTH_SHOW, payload => {
  store.dispatch(actions.setShow(payload));
  if (payload) store.dispatch(loginActions.setShow(payload));
});
