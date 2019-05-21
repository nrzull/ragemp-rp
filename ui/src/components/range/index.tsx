import React, { ComponentProps } from "react";
import "./styles.scss";

function Range(props: ComponentProps<"input">) {
  return <input {...props} type="range" className="range" />;
}

export { Range };
