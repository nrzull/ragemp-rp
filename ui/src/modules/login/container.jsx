import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "./view";
import { actions } from "./store";
import { service } from "./service";

class Container extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRemember = this.onChangeRemember.bind(this);
  }

  onChangeUsername(event) {
    this.props.setUsername(event.target.value);
  }

  onChangePassword(event) {
    this.props.setPassword(event.target.value);
  }

  onChangeRemember(event) {
    this.props.setRemember(event.currentTarget.checked);
  }

  onClickSubmit() {
    service.LogIn();
  }

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
