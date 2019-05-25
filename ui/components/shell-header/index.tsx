import React, { ComponentProps } from "react";
import "./styles.scss";

function ShellHeader(props: ComponentProps<"div">) {
  return (
    <header {...props} className="shell-header">
      {props.children}
    </header>
  );
}

export { ShellHeader };
