import { triggerServer } from "@app/bus";
import { LOGIN_SUBMIT } from "@app/events";

export function submit(payload: {
  username: string;
  password: string;
  remember: boolean;
}) {
  triggerServer(LOGIN_SUBMIT, payload);
}
