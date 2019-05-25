import React, { ComponentProps } from "react";
import "./styles.scss";

interface TProps extends ComponentProps<"div"> {
  TitleElement?: JSX.Element;
}

function ShellFooter(props: TProps) {
  const footerProps = { ...props };
  delete footerProps.TitleElement;

  return (
    <footer {...footerProps} className="shell-footer">
      {!!props.TitleElement && (
        <div className="shell-footer__title">{props.TitleElement}</div>
      )}

      <div className="shell-footer__content">{props.children}</div>
    </footer>
  );
}

export { ShellFooter };
