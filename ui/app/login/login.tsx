import React, { Component, ChangeEvent } from "react";
import { triggerServer } from "@app/bus";
import Logo from "@assets/images/logo.svg";
import * as events from "@app/events";
import * as service from "./service";

import {
  Checkbox,
  Title,
  Button,
  Input,
  ShellBody,
  ShellFooter,
  InputError
} from "@components";

interface TProps {
  store: {
    username: string;
    password: string;
    remember: boolean;
    loading: boolean;
    errors: {
      username: string;
      password: string;
    };
  };

  actions: {
    loginSetShow: (v: boolean) => void;
    loginSetLoading: (v: boolean) => void;
    loginSetUsername: (v: string) => void;
    loginSetPassword: (v: string) => void;
    loginSetRemember: (v: boolean) => void;
    registerSetShow: (v: boolean) => void;
  };
}

class Login extends Component<TProps> {
  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.loginSetUsername(event.currentTarget.value);
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.loginSetPassword(event.currentTarget.value);
  };

  onChangeRemember = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.loginSetRemember(event.currentTarget.checked);
  };

  onClickSubmit = () => {
    this.props.actions.loginSetLoading(true);
    service.submit(this.props.store);
  };

  onClickGoRegister = () => {
    this.props.actions.loginSetShow(false);
    this.props.actions.registerSetShow(true);
  };

  render() {
    const { store } = this.props;

    const {
      onClickSubmit,
      onClickGoRegister,
      onChangeRemember,
      onChangePassword,
      onChangeUsername
    } = this;

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
                value={store.username}
                onChange={onChangeUsername}
                placeholder="Введите свой логин"
              />
              <div
                data-error={!!store.errors.username}
                className="auth__input-status"
              />
            </div>

            <InputError message={store.errors.username} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Пароль</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                type="password"
                value={store.password}
                onChange={onChangePassword}
                placeholder="Введите свой пароль"
              />
              <div
                data-error={!!store.errors.password}
                className="auth__input-status"
              />
            </div>

            <InputError message={store.errors.password} />
          </div>

          <div className="auth__input-block auth__input-block_checkbox">
            <Checkbox checked={store.remember} onChange={onChangeRemember}>
              Запомнить меня
            </Checkbox>
          </div>

          <div className="auth__input-block auth__input-block_button">
            <Button disabled={store.loading} onClick={onClickSubmit}>
              {store.loading ? "Загрузка" : "Войти"}
            </Button>
          </div>
        </ShellBody>

        <ShellFooter TitleElement={<>Нету аккаунта?</>}>
          <Button disabled={store.loading} onClick={onClickGoRegister}>
            Создать
          </Button>
        </ShellFooter>
      </div>
    );
  }
}

export { Login };
