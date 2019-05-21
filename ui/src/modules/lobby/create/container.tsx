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

  onClickGroupButton = (value: TActiveGroup) => () => {
    this.setState({ activeGroup: value });
  };

  render() {
    return (
      <View
        activeGroup={this.state.activeGroup}
        onClickGroupButton={this.onClickGroupButton}
        onClickCreate={this.onClickCreate}
        onClickCancel={this.onClickCancel}
      />
    );
  }
}

export { Container };
