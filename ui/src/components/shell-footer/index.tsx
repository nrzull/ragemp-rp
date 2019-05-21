import React, { ComponentProps } from "react";
import "./styles.scss";

interface TProps extends ComponentProps<"div"> {
  "data-title"?: () => JSX.Element;
}

function ShellFooter(props: TProps) {
  const Title = props["data-title"];

  return (
    <footer {...props} className="shell-footer">
      {Title && (
        <div className="shell-footer__title">
          <Title />
        </div>
      )}

      <div className="shell-footer__content">{props.children}</div>
    </footer>
  );
}

export { ShellFooter };
