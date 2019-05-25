import React, { ComponentProps } from "react";
import "./styles.scss";

function Title(props: ComponentProps<"span">) {
  return (
    <div className="title">
      <span className="title__text">{props.children}</span>
    </div>
  );
}

export { Title };
