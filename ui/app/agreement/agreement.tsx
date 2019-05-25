import React, { Component } from "react";
import { Title, Button, ShellBody, ShellFooter } from "@components";

interface TProps {
  actions: {
    agreementSetShow: (v: boolean) => void;
    registerSetShow: (v: boolean) => void;
  };
}

class Agreement extends Component<TProps> {
  onClickGoRegister = () => {
    this.props.actions.agreementSetShow(false);
    this.props.actions.registerSetShow(true);
  };

  render() {
    const { onClickGoRegister } = this;

    return (
      <div className="auth auth_agreement">
        <ShellBody data-headless>
          <Title>Правила и соглашение</Title>
          <div className="auth__agreement-content">TODO</div>
        </ShellBody>

        <ShellFooter>
          <Button onClick={onClickGoRegister}>Назад</Button>
        </ShellFooter>
      </div>
    );
  }
}

export { Agreement };
