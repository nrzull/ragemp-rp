import React, { ComponentProps } from "react";
import "./styles.scss";

interface TProps extends ComponentProps<"input"> {
  "data-padding-for-status"?: boolean;
}

function Input(props: TProps) {
  return <input type="text" {...props} className="input" />;
}

export { Input };
