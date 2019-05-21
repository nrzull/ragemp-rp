import React, { Component } from "react";
import { View } from "./view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "@/modules/auth/agreement/store";
import { actions as registerActions } from "@/modules/auth/register/store";

interface TStoreActions {
  actions: typeof actions;
  registerActions: typeof registerActions;
}

interface TProps extends TStoreActions {}

class Container extends Component<TProps> {
  onClickGoRegister = () => {
    if (!IS_GAME) return;

    this.props.actions.setShow(false);
    this.props.registerActions.setShow(true);
  };

  render() {
    return <View onClickGoRegister={this.onClickGoRegister} />;
  }
}

function mapDispatchToProps(dispatch): TStoreActions {
  return {
    actions: bindActionCreators(actions, dispatch),
    registerActions: bindActionCreators(registerActions, dispatch)
  };
}

const ConnectedContainer = connect(
  null,
  mapDispatchToProps
)(Container);

export { ConnectedContainer as Agreement };
