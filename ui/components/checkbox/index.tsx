import React, { ComponentProps } from "react";
import "./styles.scss";
import CheckIcon from "@assets/icons/check.svg";

function Checkbox(props: ComponentProps<"input">) {
  const inputProps = { ...props, children: null };

  return (
    <div className="checkbox">
      <span className="checkbox__mark">
        <input {...inputProps} type="checkbox" className="checkbox__trigger" />
        <CheckIcon data-checked={props.checked} className="checkbox__icon" />
      </span>

      <span className="checkbox__text">{props.children}</span>
    </div>
  );
}

export { Checkbox };
