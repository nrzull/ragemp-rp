import React from "react";

interface TProps {
  onClickGoRegister: () => void;
}

function View(props: TProps) {
  return (
    <div className="auth auth_agreement">
      <div className="auth__body auth__body_agreement">
        <div className="auth__body-title">
          <span className="auth__body-title-text">Правила и соглашение</span>
        </div>

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
