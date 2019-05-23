import React, { Component, ChangeEvent, MouseEvent } from "react";
import { View } from "./view";

import {
  TOnInitOkPayload,
  TFaceFeatures,
  TActiveGroup,
  THeadOverlays
} from "./types";

import * as service from "./service";
import { bus } from "@/core";
import * as shared from "@/shared";

interface TState extends TOnInitOkPayload {
  activeGroup: TActiveGroup;
  init: boolean;
  firstName: string;
  lastName: string;
}

class Container extends Component<any, TState> {
  constructor(p) {
    super(p);

    this.state = {
      init: false,
      firstName: "",
      lastName: "",
      activeGroup: "id-card"
    } as TState;
  }

  componentWillMount() {
    bus.on(shared.events.UI_LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  componentWillUnmount() {
    bus.off(shared.events.UI_LOBBY_CREATOR_INIT_OK, this.onInit);
  }

  onInit = (payload: TOnInitOkPayload) => {
    if (!this.setState) return;
    this.setState({
      ...payload,
      init: true,
      sex: payload.sex || this.state.sex
    });
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
          firstName: value
        });

      case "lastName":
        return this.setState({
          lastName: value
        });
    }
  };

  onClickGroupButton = (value: TActiveGroup) => () => {
    this.setState({ activeGroup: value });
  };

  onClickHeadOverlay = (key: keyof THeadOverlays, step: 1 | -1) => () => {
    const headOverlay = this.state.headOverlays[key];
    const nextCurrent = headOverlay.current + step;
    const nextValue = headOverlay.values[nextCurrent];

    if (typeof nextValue !== "number") return;

    this.setState(
      {
        headOverlays: {
          ...this.state.headOverlays,
          [key]: { ...headOverlay, current: nextCurrent }
        }
      },
      () => {
        if (!IS_GAME) return;
        service.customize("head-overlay", key, nextCurrent);
      }
    );
  };

  onClickSex = (sex: "male" | "female") => () => {
    if (sex === this.state.sex) return;

    this.setState({ sex }, () => {
      if (!IS_GAME) return;
      service.customize("sex", sex);
    });
  };

  render() {
    if (!this.state.init) return <></>;

    return (
      <View
        faceFeatures={this.state.faceFeatures}
        headOverlays={this.state.headOverlays}
        activeGroup={this.state.activeGroup}
        onClickGroupButton={this.onClickGroupButton}
        onClickCreate={this.onClickCreate}
        onClickCancel={this.onClickCancel}
        onClickHeadOverlay={this.onClickHeadOverlay}
        onChangeFaceFeature={this.onChangeFaceFeature}
        onChangeName={this.onChangeName}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        onClickSex={this.onClickSex}
        sex={this.state.sex}
      />
    );
  }
}

export { Container };
