import React from "react";
import "./styles.scss";

function View(props) {
  return (
    <div className="register">
      <div>
        <input
          type="text"
          value={props.email}
          onChange={props.onChangeEmail}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="text"
          value={props.username}
          onChange={props.onChangeUsername}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="text"
          value={props.password}
          onChange={props.onChangePassword}
          placeholder="Password"
        />
      </div>
      <div>
        <input
          type="text"
          value={props.repeatPassword}
          onChange={props.onChangeRepeatPassword}
          placeholder="Repeat password"
        />
      </div>
      <div>
        <input
          type="text"
          value={props.promoCode}
          onChange={props.onChangePromoCode}
          placeholder="Promo-code"
        />
      </div>
    </div>
  );
}

export { View };
