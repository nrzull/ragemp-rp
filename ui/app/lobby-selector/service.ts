import * as events from "@app/events";
import * as bus from "@app/bus";

export function init() {
  bus.triggerClient(events.LOBBY_SELECTOR_INIT);
}

export function create() {
  bus.triggerClient(events.LOBBY_SELECTOR_CREATE);
}
