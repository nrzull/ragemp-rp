import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TGlobalState } from "@/core";
import { View } from "./view";
import * as service from "./service";
import * as store from "./store";
import * as loginStore from "@/modules/auth/login/store";
import * as agreementStore from "@/modules/auth/agreement/store";

interface TStoreActions {
  actions: typeof store.actions;
  loginActions: typeof loginStore.actions;
  agreementActions: typeof agreementStore.actions;
}

interface TStoreProps {
  username: store.TState["username"];
  agreement: store.TState["agreement"];
  email: store.TState["email"];
  errors: store.TState["errors"];
  loading: store.TState["loading"];
  password: store.TState["password"];
  repeatPassword: store.TState["repeatPassword"];
  promoCode: store.TState["promoCode"];
}

interface TProps extends TStoreProps, TStoreActions {}

class Container extends Component<TProps> {
  onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setEmail(event.currentTarget.value);
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setUsername(event.currentTarget.value);
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setPassword(event.currentTarget.value);
  };

  onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setRepeatPassword(event.currentTarget.value);
  };

  onChangePromoCode = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setPromoCode(event.currentTarget.value);
  };

  onChangeAgreement = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.setAgreement(event.currentTarget.checked);
  };

  onClickSubmit = () => {
    service.register();
  };

  onClickGoLogin = () => {
    this.props.actions.setShow(false);
    this.props.loginActions.setShow(true);
  };

  onClickGoAgreement = () => {
    if (this.props.loading) return;
    this.props.actions.setShow(false);
    this.props.agreementActions.setShow(true);
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
        onClickGoAgreement={this.onClickGoAgreement}
      />
    );
  }
}

function mapStateToProps({ register }: TGlobalState): TStoreProps {
  return { ...register };
}

function mapDispatchToProps(dispatch): TStoreActions {
  return {
    actions: bindActionCreators(store.actions, dispatch),
    loginActions: bindActionCreators(loginStore.actions, dispatch),
    agreementActions: bindActionCreators(agreementStore.actions, dispatch)
  };
}

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export { ConnectedContainer as Container };
