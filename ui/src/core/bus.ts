import Mitt from "mitt";

window.bus = new Mitt();

if (!IS_GAME) {
  window.mp = {};
  window.mp.trigger = function() {};
}

function triggerClient(event, payload?) {
  window.mp.trigger(event, JSON.stringify(payload));
}

function triggerServer(event, payload?) {
  window.mp.trigger("ui=>server", JSON.stringify({ ev: event, payload }));
}

const bus = {
  on: window.bus.on,
  off: window.bus.off,
  triggerClient,
  triggerServer
};

export { bus };
