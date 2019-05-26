import { TCustomizeType, TCustomizeKey } from "./types";
import * as bus from "@app/bus";
import * as events from "@app/events";

function init() {
  bus.triggerClient(events.LOBBY_CREATOR_INIT);
}

function customize(type: TCustomizeType, key: TCustomizeKey, value?: any) {
  bus.triggerClient(events.LOBBY_CREATOR_CUSTOMIZE, {
    type,
    key,
    value
  });
}

function submit(payload: { firstName: string; lastName: string }) {
  bus.triggerClient(events.LOBBY_CREATOR_SUBMIT, payload);
}

export { customize, init, submit };
