import React from "react";
import "./styles.scss";

function View(p) {
  return (
    <div className="login">
      <input value={p.username} onChange={p.onChangeUsername} />
      <input value={p.password} onChange={p.onChangePassword} />
      <input
        type="checkbox"
        checked={p.remember}
        onChange={p.onChangeRemember}
      />

      <button onClick={p.onClickSubmit}>Войти</button>
    </div>
  );
}

export { View };
