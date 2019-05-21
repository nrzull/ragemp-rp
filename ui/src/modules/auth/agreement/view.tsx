import React from "react";
import { Title, Button, ShellBody, ShellFooter } from "@/components";

interface TProps {
  onClickGoRegister: () => void;
}

function View(props: TProps) {
  return (
    <div className="auth auth_agreement">
      <ShellBody data-headless>
        <Title>Правила и соглашение</Title>
        <div className="auth__agreement-content">TODO</div>
      </ShellBody>

      <ShellFooter>
        <Button onClick={props.onClickGoRegister}>Назад</Button>
      </ShellFooter>
    </div>
  );
}

export { View };
