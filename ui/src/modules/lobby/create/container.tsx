import React, { Component } from "react";
import { View, TActiveGroup } from "./view";

interface TState {
  activeGroup: TActiveGroup;
}

class Container extends Component<any, TState> {
  constructor(p) {
    super(p);

    this.state = {
      activeGroup: "id-card"
    };
  }

  onClickCreate = () => {
    if (!IS_GAME) return;
  };

  onClickCancel = () => {
    if (!IS_GAME) return;
  };

  render() {
    return (
      <View
        activeGroup={this.state.activeGroup}
        onClickCreate={this.onClickCreate}
        onClickCancel={this.onClickCancel}
      />
    );
  }
}

export { Container };
