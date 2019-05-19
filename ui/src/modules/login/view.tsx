import React, { ChangeEvent } from "react";
import "./styles.scss";
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
    <div className="login">
      <header className="login__header">aquamarine project</header>

      <section className="login__body">
        <div className="login__body-title">
          <span className="login__body-title-text">Войти в аккаунт</span>
        </div>

        <div className="login__input-block">
          <label className="login__label">Логин</label>
          <input
            className="login__input"
            type="text"
            value={props.username}
            onChange={props.onChangeUsername}
            placeholder="Введите свой логин"
          />
        </div>

        <div className="login__input-block">
          <label className="login__label">Пароль</label>

          <input
            className="login__input"
            type="text"
            value={props.password}
            onChange={props.onChangePassword}
            placeholder="Введите свой пароль"
          />
        </div>

        <div className="login__input-block login__input-block_checkbox">
          <Checkbox checked={props.remember} onChange={props.onChangeRemember}>
            Запомнить меня
          </Checkbox>
        </div>

        <div className="login__input-block login__input-block_button">
          <button
            disabled={props.loading}
            onClick={props.onClickSubmit}
            className="login__button"
          >
            {props.loading ? "Загрузка" : "Войти"}
          </button>
        </div>
      </section>

      <div className="login__footer">
        <div className="login__footer-title">Нету аккаунта?</div>
        <div className="login__input-block login__input-block_button">
          <button
            disabled={props.loading}
            className="login__button"
            onClick={props.onClickGoRegister}
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}

export { View };
