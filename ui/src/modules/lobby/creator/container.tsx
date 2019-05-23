import React, { Component, ChangeEvent } from "react";
import { View } from "./view";

import {
  TOnInitOkPayload,
  TFaceFeatures,
  TName,
  TActiveGroup,
  TSex
} from "./types";

import * as service from "./service";
import { bus } from "@/core";
import * as shared from "@/shared";

interface TState extends TOnInitOkPayload {
  activeGroup?: TActiveGroup;
  gender?: TSex;
  init: boolean;
}

class Container extends Component<any, TState> {
  constructor(p) {
    super(p);

    this.state = { init: false } as any;
  }

  componentWillMount() {
    bus.on(shared.events.UI_LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  componentWillUnmount() {
    bus.off(shared.events.UI_LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  onInit = (payload: TOnInitOkPayload) => {
    if (!this.setState) return;
    this.setState({ ...payload, init: true, activeGroup: "id-card" });
  };

  componentDidMount() {
    service.init();
  }

  onClickCreate = () => {
    if (!IS_GAME) return;
  };

  onClickCancel = () => {
    if (!IS_GAME) return;
  };

  onChangeFaceFeature = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.getAttribute(
      "data-key"
    ) as keyof TFaceFeatures;

    const value = +event.currentTarget.value;
    const faceFeature = this.state.faceFeatures[key];

    this.setState(
      {
        faceFeatures: {
          ...this.state.faceFeatures,
          [key]: {
            ...faceFeature,
            current: value
          }
        }
      },
      () => {
        if (!IS_GAME) return;
        service.customize("face-feature", key, value);
      }
    );
  };

  onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    const value = event.currentTarget.value;

    switch (key) {
      case "firstName":
        return this.setState({
          firstName: { ...this.state.firstName, current: value }
        });

      case "lastName":
        return this.setState({
          lastName: { ...this.state.lastName, current: value }
        });
    }
  };

  onClickGroupButton = (value: TActiveGroup) => () => {
    this.setState({ activeGroup: value });
  };

  render() {
    if (!this.state.init) return <></>;

    return (
      <View
        faceFeatures={this.state.faceFeatures}
        activeGroup={this.state.activeGroup}
        onClickGroupButton={this.onClickGroupButton}
        onClickCreate={this.onClickCreate}
        onClickCancel={this.onClickCancel}
        onChangeFaceFeature={this.onChangeFaceFeature}
        onChangeName={this.onChangeName}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
      />
    );
  }
}

export { Container };
