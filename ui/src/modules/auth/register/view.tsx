import React, { ChangeEvent } from "react";
import "./styles.scss";
import { TState } from "./store";
import { Checkbox } from "@/components";

interface TProps {
  username: TState["username"];
  email: TState["email"];
  errors: TState["errors"];
  loading: TState["loading"];
  password: TState["password"];
  repeatPassword: TState["repeatPassword"];
  promoCode: TState["promoCode"];
  agreement: TState["agreement"];
  onChangeUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRepeatPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePromoCode: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAgreement: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickGoLogin: () => void;
}

function View(props: TProps) {
  return (
    <div className="auth">
      <header className="auth__header">aquamarine project</header>

      <section className="auth__body">
        <div className="auth__body-title">
          <span className="auth__body-title-text">Создать аккаунт</span>
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
          <label className="auth__label">Электронная почта</label>

          <input
            className="auth__input"
            type="text"
            value={props.email}
            onChange={props.onChangeEmail}
            placeholder="Введите свою электронную почту"
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

        <div className="auth__input-block">
          <label className="auth__label">Подтвердите Пароль</label>

          <input
            className="auth__input"
            type="password"
            value={props.repeatPassword}
            onChange={props.onChangeRepeatPassword}
            placeholder="Введите свой пароль снова"
          />
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Промо-код (необязательно)</label>
          <input
            className="auth__input"
            type="text"
            value={props.promoCode}
            onChange={props.onChangePromoCode}
            placeholder="Введите промо-код"
          />
        </div>

        <div className="auth__input-block auth__input-block_checkbox">
          <Checkbox
            checked={props.agreement}
            onChange={props.onChangeAgreement}
          >
            Я согласен с правилами сервера
          </Checkbox>
        </div>

        <div className="auth__input-block auth__input-block_button">
          <button
            disabled={props.loading}
            className="auth__button"
            onClick={props.onClickSubmit}
          >
            {props.loading ? "Загрузка" : "Создать"}
          </button>
        </div>
      </section>

      <footer className="auth__footer">
        <div className="auth__footer-title">Уже есть аккаунт?</div>
        <div className="auth__input-block auth__input-block_button">
          <button
            disabled={props.loading}
            className="auth__button"
            onClick={props.onClickGoLogin}
          >
            Войти
          </button>
        </div>
      </footer>
    </div>
  );
}

export { View };
