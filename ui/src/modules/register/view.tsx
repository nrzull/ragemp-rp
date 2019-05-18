import React, { ChangeEvent } from "react";
import "./styles.scss";
import { TState } from "./store";

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
    <div className="register">
      <div>
        <input
          className="register__field"
          type="text"
          value={props.username}
          onChange={props.onChangeUsername}
          placeholder="Username"
        />
      </div>
      <p className="register__error">{props.errors.username}</p>
      <div>
        <input
          className="register__field"
          type="text"
          value={props.email}
          onChange={props.onChangeEmail}
          placeholder="Email"
        />
      </div>
      <p className="register__error">{props.errors.email}</p>
      <div>
        <input
          className="register__field"
          type="text"
          value={props.password}
          onChange={props.onChangePassword}
          placeholder="Password"
        />
      </div>
      <p className="register__error">{props.errors.password}</p>
      <div>
        <input
          className="register__field"
          type="text"
          value={props.repeatPassword}
          onChange={props.onChangeRepeatPassword}
          placeholder="Repeat password"
        />
      </div>
      <p className="register__error">{props.errors.repeatPassword}</p>
      <div>
        <input
          className="register__field"
          type="text"
          value={props.promoCode}
          onChange={props.onChangePromoCode}
          placeholder="Promo-code"
        />
      </div>

      <div>
        <input
          type="checkbox"
          checked={props.agreement}
          onChange={props.onChangeAgreement}
        />
        Я согласен с правилами сервера
      </div>

      <p className="register__error">{props.errors.agreement}</p>

      <div>
        <button
          disabled={props.loading}
          className="register__submit"
          onClick={props.onClickSubmit}
        >
          {props.loading ? "Загрузка" : "Зарегистрироваться"}
        </button>

        <button
          disabled={props.loading}
          className="register__submit"
          onClick={props.onClickGoLogin}
        >
          Уже есть Аккаунт? Кликни здесь
        </button>
      </div>
    </div>
  );
}

export { View };
