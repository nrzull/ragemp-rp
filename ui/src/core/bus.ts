import Mitt from "mitt";

window.bus = new Mitt();

function triggerClient(event: string, payload?: any) {
  window.mp.trigger(event, JSON.stringify(payload));
}

function triggerServer(event: string, payload?: any) {
  window.mp.trigger(
    "ui=>server",
    JSON.stringify({ ev: event, payload: payload || null })
  );
}

const bus = {
  on: window.bus.on,
  triggerClient,
  triggerServer
};

export { bus };
