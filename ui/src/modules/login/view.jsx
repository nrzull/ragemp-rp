import React from "react";
import "./styles.scss";

function View(p) {
  return (
    <div className="login">
      <input value={p.username} onChange={p.onChangeUsername} />
    </div>
  );
}

export { View };
