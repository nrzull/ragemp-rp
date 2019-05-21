import React, { ComponentProps } from "react";
import "./styles.scss";

function Button(props: ComponentProps<"button">) {
  return (
    <button {...props} className="button">
      {props.children}
    </button>
  );
}

export { Button };
