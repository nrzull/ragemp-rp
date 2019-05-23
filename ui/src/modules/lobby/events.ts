import { bus, store } from "@/core";
import { events } from "@/shared";
import { actions } from "./store";

bus.on(events.UI_LOBBY_CREATOR_SHOW, payload => {
  store.dispatch(actions.setCreator(payload));
  store.dispatch(actions.setSelector(!payload));
});
