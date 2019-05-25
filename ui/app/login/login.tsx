import React, { Component, ChangeEvent } from "react";
import { triggerServer } from "@app/bus";
import Logo from "@assets/images/logo.svg";
import * as events from "@app/events";
import * as service from "./service";
import { TRootState } from "@app/index";
import { on, off } from "@app/bus";

import {
  Checkbox,
  Title,
  Button,
  Input,
  ShellBody,
  ShellFooter,
  InputError
} from "@components";

type TProps = {
  cache: TRootState["login"];
  actions: {
    loginCache: (v: TRootState["login"]) => void;
    loginSetShow: (v: boolean) => void;
    registerSetShow: (v: boolean) => void;
  };
};

type TState = TRootState["login"];

class Login extends Component<TProps, TState> {
  componentWillMount() {
    on(events.UI_LOGIN_SUBMIT_ERROR, this.onSubmitError);
    this.setState({ ...this.props.cache });
  }

  componentWillUnmount() {
    off(events.UI_LOGIN_SUBMIT_ERROR, this.onSubmitError);
    this.props.actions.loginCache(this.state);
  }

  onSubmitError = errors => {
    this.setState({ loading: false, errors });
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.currentTarget.value });
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.currentTarget.value });
  };

  onChangeRemember = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ remember: event.currentTarget.checked });
  };

  onClickSubmit = () => {
    this.setState({ loading: true }, () => service.submit(this.state));
  };

  onClickGoRegister = () => {
    this.props.actions.loginSetShow(false);
    this.props.actions.registerSetShow(true);
  };

  render() {
    return (
      <div className="auth">
        <ShellBody data-headless>
          <div className="auth__logo-block">
            <Logo />
          </div>

          <Title>Войти в аккаунт</Title>

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

          <div className="auth__input-block auth__input-block_checkbox">
            <Checkbox
              checked={this.state.remember}
              onChange={this.onChangeRemember}
            >
              Запомнить меня
            </Checkbox>
          </div>

          <div className="auth__input-block auth__input-block_button">
            <Button disabled={this.state.loading} onClick={this.onClickSubmit}>
              {this.state.loading ? "Загрузка" : "Войти"}
            </Button>
          </div>
        </ShellBody>

        <ShellFooter TitleElement={<>Нету аккаунта?</>}>
          <Button
            disabled={this.state.loading}
            onClick={this.onClickGoRegister}
          >
            Создать
          </Button>
        </ShellFooter>
      </div>
    );
  }
}

export { Login };
