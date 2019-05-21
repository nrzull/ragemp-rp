import React, { ChangeEvent } from "react";
import { TState } from "./store";
import { Checkbox, Title } from "@/components";

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
        <Title>Войти в аккаунт</Title>

        <div className="auth__input-block">
          <label className="auth__label">Логин</label>
          <div className="auth__input-wrapper">
            <input
              className="auth__input"
              type="text"
              value={props.username}
              onChange={props.onChangeUsername}
              placeholder="Введите свой логин"
            />
            <div
              data-error={!!props.errors.username}
              className="auth__input-status"
            />
          </div>

          <div
            data-error={!!props.errors.username}
            className="auth__input-error"
          >
            {props.errors.username}
          </div>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Пароль</label>

          <div className="auth__input-wrapper">
            <input
              className="auth__input"
              type="password"
              value={props.password}
              onChange={props.onChangePassword}
              placeholder="Введите свой пароль"
            />
            <div
              data-error={!!props.errors.password}
              className="auth__input-status"
            />
          </div>

          <div
            data-error={!!props.errors.password}
            className="auth__input-error"
          >
            {props.errors.password}
          </div>
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
