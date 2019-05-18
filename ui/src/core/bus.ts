import Mitt from "mitt";

window.bus = new Mitt();

function triggerClient(event, payload?) {
  window.mp.trigger(event, JSON.stringify(payload));
}

function triggerServer(event, payload?) {
  window.mp.trigger("ui=>server", JSON.stringify({ ev: event, payload }));
}

const bus = {
  on: window.bus.on,
  triggerClient,
  triggerServer
};

export { bus };
