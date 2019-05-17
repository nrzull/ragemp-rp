import React from "react";
import "./styles.scss";

function View(props) {
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
            defaultChecked={props.remember}
            onChange={props.onChangeRemember}
          />
          Запомнить меня
        </label>
      </div>
      <div>
        <button className="login__submit" onClick={props.onClickSubmit}>
          Войти
        </button>
      </div>
    </div>
  );
}

export { View };
