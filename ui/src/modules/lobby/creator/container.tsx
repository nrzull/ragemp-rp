import React, { Component, ChangeEvent, MouseEvent } from "react";
import { View } from "./view";

import {
  TOnInitOkPayload,
  TFaceFeatures,
  TActiveGroup,
  THeadOverlays,
  TParent
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
      service.customize("sex", null, sex);
    });
  };

  onClickHair = (step: 1 | -1) => () => {
    const nextCurrent = this.state.hair.current + step;
    const nextValue = this.state.hair.values[nextCurrent];
    if (typeof nextValue !== "number") return;

    this.setState(
      { hair: { ...this.state.hair, current: nextCurrent } },
      () => {
        if (!IS_GAME) return;
        service.customize("hair", null, nextCurrent);
      }
    );
  };

  onClickColor = (step: 1 | -1) => () => {
    const nextCurrent = this.state.color.current + step;
    const nextValue = this.state.color.values[nextCurrent];
    if (typeof nextValue !== "number") return;

    this.setState(
      { color: { ...this.state.color, current: nextCurrent } },
      () => {
        if (!IS_GAME) return;
        service.customize("color", null, nextCurrent);
      }
    );
  };

  onClickFather = (step: 1 | -1) => () => {
    const nextCurrent = this.state.fathers.current + step;
    const nextValue = this.state.fathers.values[nextCurrent];

    if (!nextValue) return;

    this.setState(
      { fathers: { ...this.state.fathers, current: nextCurrent } },
      () => {
        if (!IS_GAME) return;
        service.customize("father", null, nextCurrent);
      }
    );
  };

  onClickMother = (step: 1 | -1) => () => {
    const nextCurrent = this.state.mothers.current + step;
    const nextValue = this.state.mothers.values[nextCurrent];

    if (!nextValue) return;

    this.setState(
      { mothers: { ...this.state.mothers, current: nextCurrent } },
      () => {
        if (!IS_GAME) return;
        service.customize("mother", null, nextCurrent);
      }
    );
  };

  onChangeSkinMix = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    this.setState(
      { skinMix: { ...this.state.skinMix, current: value } },
      () => {
        if (!IS_GAME) return;
        service.customize("skin-mix", null, value);
      }
    );
  };

  onChangeShapeMix = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    this.setState(
      { shapeMix: { ...this.state.shapeMix, current: value } },
      () => {
        if (!IS_GAME) return;
        service.customize("shape-mix", null, value);
      }
    );
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
        onClickHair={this.onClickHair}
        onClickColor={this.onClickColor}
        hair={this.state.hair}
        sex={this.state.sex}
        color={this.state.color}
        fathers={this.state.fathers}
        mothers={this.state.mothers}
        onClickFather={this.onClickFather}
        onClickMother={this.onClickMother}
        shapeMix={this.state.shapeMix}
        skinMix={this.state.skinMix}
        onChangeShapeMix={this.onChangeShapeMix}
        onChangeSkinMix={this.onChangeSkinMix}
      />
    );
  }
}

export { Container };
