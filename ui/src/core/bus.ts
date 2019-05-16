import Mitt from "mitt";

window.bus = new Mitt();

function on(event: string, cb: Function) {
  window.bus.on(event, cb);
}

function triggerClient(event: string, payload?: any) {
  window.mp.trigger(event, JSON.stringify(payload));
}

function triggerServer(event: string, payload?: any) {
  window.mp.trigger("ui=>server", JSON.stringify({ event, payload }));
}

const bus = {
  on,
  triggerClient,
  triggerServer
};

export { bus };
