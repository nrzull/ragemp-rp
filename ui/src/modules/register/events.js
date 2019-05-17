import { bus, store } from "@/core";
import { shared } from "@/shared";
import { actions } from "@/modules/register/store";

bus.on(shared.events.UI_REGISTER_SHOW, payload => {
  store.dispatch(actions.show(payload));
});

bus.on(shared.events.UI_REGISTER_OK, payload => {
  store.dispatch(actions.setErrors(payload));
});

bus.on(shared.events.UI_REGISTER_ERROR, payload => {
  store.dispatch(actions.setErrors(payload));
});
