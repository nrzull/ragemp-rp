import React, { Component, ChangeEvent } from "react";
import * as service from "./service";
import { on, off } from "@app/bus";
import * as events from "@app/events";
import { service as loginService } from "@app/login";

import {
  Checkbox,
  Title,
  Button,
  Input,
  ShellBody,
  ShellFooter,
  InputError
} from "@components";

import { TRootState } from "@app/index";

type TProps = {
  cache: TRootState["register"];
  actions: {
    registerCache: (v: TRootState["register"]) => void;
    registerSetShow: (v: boolean) => void;
    loginSetShow: (v: boolean) => void;
    agreementSetShow: (v: boolean) => void;
  };
};

type TState = TRootState["register"];

class Register extends Component<TProps, TState> {
  componentWillMount() {
    on(events.UI_REGISTER_SUBMIT_ERROR, this.onSubmitError);
    on(events.UI_REGISTER_SUBMIT_OK, this.onSubmitOk);
    this.setState({ ...this.props.cache });
  }

  componentWillUnmount() {
    off(events.UI_REGISTER_SUBMIT_ERROR, this.onSubmitError);
    off(events.UI_REGISTER_SUBMIT_OK, this.onSubmitOk);
    this.props.actions.registerCache(this.state);
  }

  onSubmitError = errors => {
    this.setState({ loading: false, errors });
  };

  onSubmitOk = () => {
    loginService.submit({
      username: this.state.username,
      password: this.state.password,
      remember: true
    });
  };

  onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.currentTarget.value });
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ repeatPassword: event.currentTarget.value });
  };

  onChangePromoCode = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ promoCode: event.currentTarget.value });
  };

  onChangeAgreement = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ agreement: event.currentTarget.checked });
  };

  onClickSubmit = () => {
    this.setState({ loading: true }, () => service.submit(this.state));
  };

  onClickGoLogin = () => {
    this.props.actions.registerSetShow(false);
    this.props.actions.loginSetShow(true);
  };

  onClickGoAgreement = () => {
    if (this.state.loading) return;

    this.props.actions.registerSetShow(false);
    this.props.actions.agreementSetShow(true);
  };

  render() {
    return (
      <div className="auth">
        <ShellBody data-headless>
          <Title>Создать аккаунт</Title>

          <div className="auth__input-block">
            <label className="auth__label">Логин</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                value={this.state.username}
                onChange={this.onChangeUsername}
                placeholder="Введите свой логин"
              />
              <div
                data-error={!!this.state.errors.username}
                className="auth__input-status"
              />
            </div>

            <InputError message={this.state.errors.username} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Электронная почта</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                value={this.state.email}
                onChange={this.onChangeEmail}
                placeholder="Введите свою электронную почту"
              />
              <div
                data-error={!!this.state.errors.email}
                className="auth__input-status"
              />
            </div>

            <InputError message={this.state.errors.email} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Пароль</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Введите свой пароль"
              />
              <div
                data-error={!!this.state.errors.password}
                className="auth__input-status"
              />
            </div>

            <InputError message={this.state.errors.password} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Подтвердите Пароль</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                type="password"
                value={this.state.repeatPassword}
                onChange={this.onChangeRepeatPassword}
                placeholder="Введите свой пароль снова"
              />
              <div
                data-error={!!this.state.errors.repeatPassword}
                className="auth__input-status"
              />
            </div>

            <InputError message={this.state.errors.repeatPassword} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Промо-код (необязательно)</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                value={this.state.promoCode}
                onChange={this.onChangePromoCode}
                placeholder="Введите промо-код"
              />
              <div
                data-error={!!this.state.errors.promoCode}
                className="auth__input-status"
              />
            </div>

            <InputError message={this.state.errors.promoCode} />
          </div>

          <div className="auth__input-block auth__input-block_checkbox">
            <Checkbox
              checked={this.state.agreement}
              onChange={this.onChangeAgreement}
            >
              Я согласен с{" "}
              <i onClick={this.onClickGoAgreement} className="auth__link">
                правилами сервера
              </i>
            </Checkbox>

            <div
              data-error={!!this.state.errors.agreement}
              className="auth__input-error"
            >
              {this.state.errors.agreement}
            </div>
          </div>

          <div className="auth__input-block auth__input-block_button">
            <Button disabled={this.state.loading} onClick={this.onClickSubmit}>
              {this.state.loading ? "Загрузка" : "Создать"}
            </Button>
          </div>
        </ShellBody>

        <ShellFooter TitleElement={<>Уже есть аккаунт?</>}>
          <Button disabled={this.state.loading} onClick={this.onClickGoLogin}>
            Войти
          </Button>
        </ShellFooter>
      </div>
    );
  }
}

export { Register };
