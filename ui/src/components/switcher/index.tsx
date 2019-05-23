import React, { ComponentProps } from "react";
import "./styles.scss";
import Arrow from "@/assets/icons/arrow.svg";

interface TProps extends ComponentProps<"div"> {
  onClickPrevious: () => void;
  onClickNext: () => void;
}

function Switcher(props: TProps) {
  return (
    <div className="switcher">
      <div className="switcher__content">{props.children}</div>

      <div className="switcher__buttons">
        <Arrow
          onClick={props.onClickPrevious}
          className="switcher__button switcher__button_left"
        />
        <Arrow
          onClick={props.onClickNext}
          className="switcher__button switcher__button_right"
        />
      </div>
    </div>
  );
}

export { Switcher };
