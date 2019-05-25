import React, { ComponentProps } from "react";
import cn from "classnames";
import "./styles.scss";

function ShellBody(props: ComponentProps<"div">) {
  return (
    <section {...props} className={cn("shell-body", props.className)}>
      {props.children}
    </section>
  );
}

export { ShellBody };
