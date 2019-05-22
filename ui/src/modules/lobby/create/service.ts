import { TCustomizeType, TCustomizeKey } from "./types";
import { bus } from "@/core";
import * as shared from "@/shared";

function customize(type: TCustomizeType, key: TCustomizeKey, value: any) {
  bus.triggerClient(shared.events.UI_LOBBY_CREATE_CUSTOMIZE, {
    type,
    key,
    value
  });
}

export { customize };
