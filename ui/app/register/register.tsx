import React, { Component, ChangeEvent } from "react";
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
    email: string;
    password: string;
    repeatPassword: string;
    promoCode: string;
    agreement: boolean;
    loading: boolean;
    errors: {
      username: string;
      email: string;
      password: string;
      repeatPassword: string;
      promoCode: string;
      agreement: string;
    };
  };

  actions: {
    registerSetShow: (v: boolean) => void;
    registerSetLoading: (v: boolean) => void;
    registerSetEmail: (v: string) => void;
    registerSetUsername: (v: string) => void;
    registerSetPassword: (v: string) => void;
    registerSetRepeatPassword: (v: string) => void;
    registerSetPromoCode: (v: string) => void;
    registerSetAgreement: (v: boolean) => void;
    loginSetShow: (v: boolean) => void;
    agreementSetShow: (v: boolean) => void;
  };
}

class Register extends Component<TProps> {
  onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetEmail(event.currentTarget.value);
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetUsername(event.currentTarget.value);
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetPassword(event.currentTarget.value);
  };

  onChangeRepeatPassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetRepeatPassword(event.currentTarget.value);
  };

  onChangePromoCode = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetPromoCode(event.currentTarget.value);
  };

  onChangeAgreement = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.actions.registerSetAgreement(event.currentTarget.checked);
  };

  onClickSubmit = () => {
    this.props.actions.registerSetLoading(true);
    service.submit(this.props.store);
  };

  onClickGoLogin = () => {
    this.props.actions.registerSetShow(false);
    this.props.actions.loginSetShow(true);
  };

  onClickGoAgreement = () => {
    if (this.props.store.loading) return;

    this.props.actions.registerSetShow(false);
    this.props.actions.agreementSetShow(true);
  };

  render() {
    const { store } = this.props;

    const {
      onClickGoAgreement,
      onClickGoLogin,
      onClickSubmit,
      onChangeAgreement,
      onChangePromoCode,
      onChangeRepeatPassword,
      onChangePassword,
      onChangeUsername,
      onChangeEmail
    } = this;

    return (
      <div className="auth">
        <ShellBody data-headless>
          <Title>Создать аккаунт</Title>

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
            <label className="auth__label">Электронная почта</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                value={store.email}
                onChange={onChangeEmail}
                placeholder="Введите свою электронную почту"
              />
              <div
                data-error={!!store.errors.email}
                className="auth__input-status"
              />
            </div>

            <InputError message={store.errors.email} />
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

          <div className="auth__input-block">
            <label className="auth__label">Подтвердите Пароль</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                type="password"
                value={store.repeatPassword}
                onChange={onChangeRepeatPassword}
                placeholder="Введите свой пароль снова"
              />
              <div
                data-error={!!store.errors.repeatPassword}
                className="auth__input-status"
              />
            </div>

            <InputError message={store.errors.repeatPassword} />
          </div>

          <div className="auth__input-block">
            <label className="auth__label">Промо-код (необязательно)</label>

            <div className="auth__input-wrapper">
              <Input
                data-padding-for-status
                value={store.promoCode}
                onChange={onChangePromoCode}
                placeholder="Введите промо-код"
              />
              <div
                data-error={!!store.errors.promoCode}
                className="auth__input-status"
              />
            </div>

            <InputError message={store.errors.promoCode} />
          </div>

          <div className="auth__input-block auth__input-block_checkbox">
            <Checkbox checked={store.agreement} onChange={onChangeAgreement}>
              Я согласен с{" "}
              <i onClick={onClickGoAgreement} className="auth__link">
                правилами сервера
              </i>
            </Checkbox>

            <div
              data-error={!!store.errors.agreement}
              className="auth__input-error"
            >
              {store.errors.agreement}
            </div>
          </div>

          <div className="auth__input-block auth__input-block_button">
            <Button disabled={store.loading} onClick={onClickSubmit}>
              {store.loading ? "Загрузка" : "Создать"}
            </Button>
          </div>
        </ShellBody>

        <ShellFooter TitleElement={<>Уже есть аккаунт?</>}>
          <Button disabled={store.loading} onClick={onClickGoLogin}>
            Войти
          </Button>
        </ShellFooter>
      </div>
    );
  }
}

export { Register };
