import React, { Component } from "react";
import { View } from "./view";
import { connect } from "react-redux";
import { actions } from "./store";
import { service } from "./service";

class Container extends Component {
  onChangeUsername = ev => this.props.setUsername(ev.currentTarget.value);
  onChangePassword = ev => this.props.setPassword(ev.currentTarget.value);
  onChangeRemember = ev => this.props.setRemember(ev.currentTarget.checked);

  render() {
    return (
      <View
        username={this.props.username}
        password={this.props.password}
        remember={this.props.remember}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRemember={this.onChangeRemember}
        onClickSubmit={service.logIn}
      />
    );
  }
}

const mapStateToProps = ({ login }) => ({ ...login });
const mapActionsToProps = { ...actions };

const ConnectedContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(Container);

export { ConnectedContainer as Container };
