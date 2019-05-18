import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "./view";
import { actions } from "./store";
import { service } from "./service";
import { actions as loginActions } from "@/modules/login/store";

class Container extends Component {
  onChangeEmail = ev => {
    this.props.setEmail(ev.currentTarget.value);
  };

  onChangeUsername = ev => {
    this.props.setUsername(ev.currentTarget.value);
  };

  onChangePassword = ev => {
    this.props.setPassword(ev.currentTarget.value);
  };

  onChangeRepeatPassword = ev => {
    this.props.setRepeatPassword(ev.currentTarget.value);
  };

  onChangePromoCode = ev => {
    this.props.setPromoCode(ev.currentTarget.value);
  };

  onChangeAgreement = ev => {
    this.props.setAgreement(ev.currentTarget.checked);
  };

  onClickSubmit = () => {
    service.Register();
  };

  onClickGoLogin = () => {
    this.props.setShow(false);
    this.props.loginSetShow(true);
  };

  render() {
    return (
      <View
        email={this.props.email}
        username={this.props.username}
        password={this.props.password}
        repeatPassword={this.props.repeatPassword}
        promoCode={this.props.promoCode}
        loading={this.props.loading}
        errors={this.props.errors}
        agreement={this.props.agreement}
        onChangeEmail={this.onChangeEmail}
        onChangeUsername={this.onChangeUsername}
        onChangePassword={this.onChangePassword}
        onChangeRepeatPassword={this.onChangeRepeatPassword}
        onChangePromoCode={this.onChangePromoCode}
        onChangeAgreement={this.onChangeAgreement}
        onClickSubmit={this.onClickSubmit}
        onClickGoLogin={this.onClickGoLogin}
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
    promoCode: register.promoCode,
    loading: register.loading,
    errors: register.errors,
    agreement: register.agreement
  };
}

const mapDispatchToProps = {
  ...actions,
  loginSetShow: loginActions.setShow
};

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export { ConnectedContainer as Container };
