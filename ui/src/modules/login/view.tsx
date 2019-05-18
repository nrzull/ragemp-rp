import React, { ChangeEvent } from "react";
import "./styles.scss";
import { TState } from "./store";

interface TProps {
  username: TState["username"];
  password: TState["password"];
  errors: TState["errors"];
  loading: TState["loading"];
  remember: TState["remember"];
  onChangeUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRemember: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickGoRegister: () => void;
}

function View(props: TProps) {
  return (
    <div className="login">
      <div>
        <input
          className="login__field"
          type="text"
          value={props.username}
          onChange={props.onChangeUsername}
          placeholder="Username"
        />
      </div>
      <p className="login__error">{props.errors.username}</p>
      <div>
        <input
          className="login__field"
          type="text"
          value={props.password}
          onChange={props.onChangePassword}
          placeholder="Password"
        />
      </div>
      <p className="login__error">{props.errors.password}</p>
      <div>
        <label>
          <input
            className="login__checkbox"
            type="checkbox"
            checked={props.remember}
            onChange={props.onChangeRemember}
          />
          Запомнить меня
        </label>
      </div>
      <div>
        <button
          disabled={props.loading}
          className="login__submit"
          onClick={props.onClickSubmit}
        >
          {props.loading ? "Загрузка" : "Войти"}
        </button>

        <button
          disabled={props.loading}
          className="login__submit"
          onClick={props.onClickGoRegister}
        >
          Нету аккаунта? Кликни здесь!
        </button>
      </div>
    </div>
  );
}

export { View };
