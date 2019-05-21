import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TGlobalState } from "@/core";
import { View } from "./view";
import * as store from "./store";
import * as service from "./service";
import * as registerStore from "@/modules/auth/register/store";

interface TStoreActions {
  actions: typeof store.actions;
  registerActions: typeof registerStore.actions;
}

interface TStoreProps {
  username: store.TState["username"];
  password: store.TState["password"];
  loading: store.TState["loading"];
  remember: store.TState["remember"];
  errors: store.TState["errors"];
}

interface TProps extends TStoreProps, TStoreActions {}

class Container extends Component<TProps> {
  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setUsername(event.currentTarget.value);
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setPassword(event.currentTarget.value);
  };

  onChangeRemember = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setRemember(event.currentTarget.checked);
  };

  onClickSubmit = () => {
    if (!IS_GAME) return;

    service.logIn();
  };

  onClickGoRegister = () => {
    if (!IS_GAME) return;

    this.props.actions.setShow(false);
    this.props.registerActions.setShow(true);
  };

  render() {
    return (
      <View
        username={this.props.username}
        password={this.props.password}
        remember={this.props.remember}
        loading={this.props.loading}
        errors={this.props.errors}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRemember={this.onChangeRemember}
        onClickSubmit={this.onClickSubmit}
        onClickGoRegister={this.onClickGoRegister}
      />
    );
  }
}

function mapStateToProps({ login }: TGlobalState): TStoreProps {
  return { ...login };
}

function mapDispatchToProps(dispatch): TStoreActions {
  return {
    actions: bindActionCreators(store.actions, dispatch),
    registerActions: bindActionCreators(registerStore.actions, dispatch)
  };
}

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export { ConnectedContainer as Container };
