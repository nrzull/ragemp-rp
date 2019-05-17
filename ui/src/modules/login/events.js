import { bus, store } from "@/core";
import { shared } from "@/shared";
import { actions } from "@/modules/login/store";

bus.on(shared.events.UI_LOGIN_SHOW, payload => {
  store.dispatch(actions.show(payload));
});

bus.on(shared.events.UI_LOGIN_ERROR, payload => {
  store.dispatch(actions.setErrors(payload));
});
