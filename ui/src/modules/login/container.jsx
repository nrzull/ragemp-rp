import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "./view";
import { actions } from "./store";
import { service } from "./service";

class Container extends Component {
  onChangeUsername = ev => this.props.setUsername(ev.currentTarget.value);
  onChangePassword = ev => this.props.setPassword(ev.currentTarget.value);
  onChangeRemember = ev => this.props.setRemember(ev.currentTarget.checked);

  onClickSubmit = () => {
    service.logIn();
  };

  render() {
    return (
      <View
        username={this.props.username}
        password={this.props.password}
        remember={this.props.rememebr}
        loading={this.props.loading}
        errors={this.props.errors}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRemember={this.onChangeRemember}
        onClickSubmit={this.onClickSubmit}
      />
    );
  }
}

function mapStateToProps({ login }) {
  return {
    username: login.username,
    password: login.password,
    remember: login.remember,
    loading: login.loading,
    errors: login.errors
  };
}

const mapDispatchToProps = {
  ...actions
};

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export { ConnectedContainer as Container };
