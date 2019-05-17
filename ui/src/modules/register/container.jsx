import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "./view";
import { actions } from "./store";

class Container extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    this.onChangePromoCode = this.onChangePromoCode.bind(this);
  }

  onChangeEmail(event) {
    this.props.setEmail(event.target.value);
  }

  onChangeUsername(event) {
    this.props.setUsername(event.target.value);
  }

  onChangePassword(event) {
    this.props.setPassword(event.target.value);
  }

  onChangeRepeatPassword(event) {
    this.props.setRepeatPassword(event.target.value);
  }

  onChangePromoCode(event) {
    this.props.setPromoCode(event.target.value);
  }

  render() {
    return (
      <View
        email={this.props.email}
        username={this.props.username}
        password={this.props.password}
        repeatPassword={this.props.repeatPassword}
        promoCode={this.props.promoCode}
        onChangeEmail={this.onChangeEmail}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRepeatPassword={this.onChangeRepeatPassword}
        onChangePromoCode={this.onChangePromoCode}
      />
    );
  }
}

function mapStateToProps({ register }) {
  return {
    email: register.email,
    username: register.username,
    password: register.password,
    repeatPassword: register.repeatPassword,
    promoCode: register.promoCode
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
