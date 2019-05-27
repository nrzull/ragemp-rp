import React, { Component } from "react";
import "./styles.scss";
import { ShellHeader, ShellBody, ShellFooter, Button } from "@components";
import { TInitOkPayload } from "./types";
import * as service from "./service";
import * as bus from "@app/bus";
import * as events from "@app/events";

type TState = {
  init: boolean;
  characters: TInitOkPayload;
};

class LobbySelector extends Component<{}, TState> {
  constructor(p) {
    super(p);

    this.state = { init: false } as TState;
  }

  componentWillMount() {
    bus.on(events.LOBBY_SELECTOR_INIT_OK, this.onInitOk);
  }

  componentWillUnmount() {
    bus.on(events.LOBBY_SELECTOR_INIT_OK, this.onInitOk);
  }

  componentDidMount() {
    service.init();
  }

  onInitOk = (payload: TInitOkPayload) => {
    this.setState({ init: true, characters: payload });
  };

  onClickCreate = () => {
    service.create();
  };

  render() {
    if (!this.state.init) return <></>;

    return (
      <div className="lobby-selector">
        <ShellHeader>Выбор персонажа</ShellHeader>

        <ShellBody className="lobby-selector__body">
          {this.state.characters.map(v => (
            <div className="lobby-selector__item">
              {v.firstName} {v.lastName}
            </div>
          ))}
        </ShellBody>

        <ShellFooter>
          <Button onClick={this.onClickCreate}>Создать</Button>
        </ShellFooter>
      </div>
    );
  }
}

export { LobbySelector };
