import React from "react";
import "./styles.scss";

function View(props) {
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
