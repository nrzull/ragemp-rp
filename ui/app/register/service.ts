import * as bus from "@app/bus";
import * as events from "@app/events";

export function submit(payload: {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  promoCode: string;
  agreement: boolean;
}) {
  bus.triggerServer(events.REGISTER_SUBMIT, payload);
}
