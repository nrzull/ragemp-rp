import React, { Component, ChangeEvent } from "react";
import { View } from "./view";
import { connect } from "react-redux";
import { Store } from "@/core";
import { actions, State } from "./store";

type Props = typeof actions & State;

class Container extends Component<Props> {
  onChangeUsername = (ev: ChangeEvent<HTMLInputElement>) =>
    this.props.setUsername(ev.currentTarget.value);

  onChangePassword = (ev: ChangeEvent<HTMLInputElement>) =>
    this.props.setPassword(ev.currentTarget.value);

  onChangeRemember = (ev: ChangeEvent<HTMLInputElement>) =>
    this.props.setRemember(ev.currentTarget.checked);

  render() {
    return (
      <View
        username={this.props.username}
        password={this.props.password}
        remember={this.props.remember}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRemember={this.onChangeRemember}
      />
    );
  }
}

const mapStateToProps = ({ login }: Store) => ({ ...login });
const mapActionsToProps = { ...actions };

const ConnectedContainer: any = connect(
  mapStateToProps,
  mapActionsToProps
)(Container);

export { ConnectedContainer as Container };
