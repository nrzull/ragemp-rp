import { bus, store } from "@/core";
import { shared } from "@/shared";
import { actions } from "@/modules/login/store";

bus.on(shared.events.UI_LOGIN_SHOW, payload => {
  store.dispatch(actions.setShow(payload));
});

bus.on(shared.events.UI_LOGIN_SUBMIT_OK, () => {
  console.log("LOGIN SUBMIT OK");
});

bus.on(shared.events.UI_LOGIN_SUBMIT_ERROR, e => {
  console.log("LOGIN SUBMIT ERROR", e);
});
