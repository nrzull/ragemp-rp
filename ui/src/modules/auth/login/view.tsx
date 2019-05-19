import React, { ChangeEvent } from "react";
import { TState } from "./store";
import { Checkbox } from "@/components";

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
    <div className="auth">
      <header className="auth__header">aquamarine project</header>

      <section className="auth__body">
        <div className="auth__body-title">
          <span className="auth__body-title-text">Войти в аккаунт</span>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Логин</label>
          <input
            className="auth__input"
            type="text"
            value={props.username}
            onChange={props.onChangeUsername}
            placeholder="Введите свой логин"
          />
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Пароль</label>

          <input
            className="auth__input"
            type="password"
            value={props.password}
            onChange={props.onChangePassword}
            placeholder="Введите свой пароль"
          />
        </div>

        <div className="auth__input-block auth__input-block_checkbox">
          <Checkbox checked={props.remember} onChange={props.onChangeRemember}>
            Запомнить меня
          </Checkbox>
        </div>

        <div className="auth__input-block auth__input-block_button">
          <button
            disabled={props.loading}
            onClick={props.onClickSubmit}
            className="auth__button"
          >
            {props.loading ? "Загрузка" : "Войти"}
          </button>
        </div>
      </section>

      <footer className="auth__footer">
        <div className="auth__footer-title">Нету аккаунта?</div>
        <div className="auth__input-block auth__input-block_button">
          <button
            disabled={props.loading}
            className="auth__button"
            onClick={props.onClickGoRegister}
          >
            Создать
          </button>
        </div>
      </footer>
    </div>
  );
}

export { View };
