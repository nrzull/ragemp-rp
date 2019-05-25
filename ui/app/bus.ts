import Mitt from "mitt";

window.bus = new Mitt();

export const on = window.bus.on;
export const off = window.bus.off;

export function triggerClient(event, payload?) {
  window.mp.trigger(event, JSON.stringify(payload));
}

export function triggerServer(event, payload?) {
  window.mp.trigger("ui=>server", JSON.stringify({ ev: event, payload }));
}
