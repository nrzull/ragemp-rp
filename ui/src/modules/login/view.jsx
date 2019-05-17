import React, { ChangeEvent } from "react";
import "./styles.scss";

interface Props {
  username: string;
  password: string;
  remember: boolean;
  onChangeUsername: (ev: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (ev: ChangeEvent<HTMLInputElement>) => void;
  onChangeRemember: (ev: ChangeEvent<HTMLInputElement>) => void;
}

function View(p: Props) {
  return (
    <div className="login">
      <input value={p.username} onChange={p.onChangeUsername} />
    </div>
  );
}

export { View };
