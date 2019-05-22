import React from "react";
import "./styles.scss";

interface TProps {
  message: string;
}

function InputError(props: TProps) {
  return (
    <div data-error={!!props.message} className="input-error">
      {props.message}
    </div>
  );
}

export { InputError };
