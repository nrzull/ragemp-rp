import React, { Component, ChangeEvent } from "react";
import { View } from "./view";
import { TFaceFeature, TFaceFeatures, TActiveGroup, TSex } from "./types";
import * as service from "./service";

interface TState {
  activeGroup: TActiveGroup;
  faceFeatures: TFaceFeatures;
  firstName: string;
  lastName: string;
  gender: TSex;
}

const initialFaceFeature: TFaceFeature = {
  min: -1,
  max: 1,
  current: 0
};

const initialGender = "male";

class Container extends Component<any, TState> {
  constructor(p) {
    super(p);

    this.state = {
      activeGroup: "id-card",
      firstName: "",
      lastName: "",
      gender: initialGender,
      faceFeatures: {
        noseWidth: { ...initialFaceFeature },
        noseHeight: { ...initialFaceFeature },
        noseLength: { ...initialFaceFeature },
        noseBridge: { ...initialFaceFeature },
        noseTip: { ...initialFaceFeature },
        noseBridgeShift: { ...initialFaceFeature },
        browHeight: { ...initialFaceFeature },
        browWidth: { ...initialFaceFeature },
        cheekboneHeight: { ...initialFaceFeature },
        cheeckboneWidth: { ...initialFaceFeature },
        cheeksWidth: { ...initialFaceFeature },
        eyes: { ...initialFaceFeature },
        lips: { ...initialFaceFeature },
        jawWidth: { ...initialFaceFeature },
        jawHeight: { ...initialFaceFeature },
        chinLength: { ...initialFaceFeature },
        chinPosition: { min: 0, max: 1, current: 0.5 },
        chinWidth: { ...initialFaceFeature },
        chinShape: { ...initialFaceFeature },
        neckWidth: { ...initialFaceFeature }
      }
    };
  }

  componentDidMount() {
    if (!IS_GAME) return;
    service.reset(this.state.faceFeatures, this.state.gender);
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
        return this.setState({ firstName: value });

      case "lastName":
        return this.setState({ lastName: value });
    }
  };

  onClickGroupButton = (value: TActiveGroup) => () => {
    this.setState({ activeGroup: value });
  };

  render() {
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
