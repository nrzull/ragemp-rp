import { TCustomizeType, TCustomizeKey, TFaceFeatures, TSex } from "./types";
import { bus } from "@/core";
import * as shared from "@/shared";

function init() {
  bus.triggerClient(shared.events.UI_LOBBY_CREATOR_INIT);
}

function customize(type: TCustomizeType, key: TCustomizeKey, value: any) {
  bus.triggerClient(shared.events.UI_LOBBY_CREATE_CUSTOMIZE, {
    type,
    key,
    value
  });
}

function reset(faceFeatures: TFaceFeatures, sex: TSex) {
  bus.triggerClient(shared.events.UI_LOBBY_CREATE_RESET, { faceFeatures, sex });
}

export { customize, reset, init };
