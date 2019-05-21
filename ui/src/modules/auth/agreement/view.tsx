import React from "react";
import { Title } from "@/components";

interface TProps {
  onClickGoRegister: () => void;
}

function View(props: TProps) {
  return (
    <div className="auth auth_agreement">
      <div className="auth__body auth__body_agreement">
        <Title>Правила и соглашение</Title>

        <div className="auth__agreement-content">TODO</div>
      </div>

      <footer className="auth__footer">
        <div className="auth__input-block auth__input-block_button">
          <button className="auth__button" onClick={props.onClickGoRegister}>
            Назад
          </button>
        </div>
      </footer>
    </div>
  );
}

export { View };
