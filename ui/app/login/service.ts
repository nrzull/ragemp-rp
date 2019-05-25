import { triggerServer } from "@app/bus";
import { SERVER_LOGIN_SUBMIT } from "@app/events";

export function submit(payload: {
  username: string;
  password: string;
  remember: boolean;
}) {
  triggerServer(SERVER_LOGIN_SUBMIT, payload);
}
