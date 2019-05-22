import React, { ChangeEvent } from "react";
import "./styles.scss";
import { TState } from "./store";
import {
  Checkbox,
  Title,
  Button,
  Input,
  ShellBody,
  ShellFooter
} from "@/components";

interface TProps {
  username: TState["username"];
  email: TState["email"];
  errors: TState["errors"];
  loading: TState["loading"];
  password: TState["password"];
  repeatPassword: TState["repeatPassword"];
  promoCode: TState["promoCode"];
  agreement: TState["agreement"];
  onChangeUsername: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRepeatPassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePromoCode: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAgreement: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickGoLogin: () => void;
  onClickGoAgreement: () => void;
}

function View(props: TProps) {
  return (
    <div className="auth">
      <ShellBody data-headless>
        <Title>Создать аккаунт</Title>

        <div className="auth__input-block">
          <label className="auth__label">Логин</label>

          <div className="auth__input-wrapper">
            <Input
              data-padding-for-status
              value={props.username}
              onChange={props.onChangeUsername}
              placeholder="Введите свой логин"
            />
            <div
              data-error={!!props.errors.username}
              className="auth__input-status"
            />
          </div>

          <div
            data-error={!!props.errors.username}
            className="auth__input-error"
          >
            {props.errors.username}
          </div>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Электронная почта</label>

          <div className="auth__input-wrapper">
            <Input
              data-padding-for-status
              value={props.email}
              onChange={props.onChangeEmail}
              placeholder="Введите свою электронную почту"
            />
            <div
              data-error={!!props.errors.email}
              className="auth__input-status"
            />
          </div>

          <div data-error={!!props.errors.email} className="auth__input-error">
            {props.errors.email}
          </div>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Пароль</label>

          <div className="auth__input-wrapper">
            <Input
              data-padding-for-status
              type="password"
              value={props.password}
              onChange={props.onChangePassword}
              placeholder="Введите свой пароль"
            />
            <div
              data-error={!!props.errors.password}
              className="auth__input-status"
            />
          </div>

          <div
            data-error={!!props.errors.password}
            className="auth__input-error"
          >
            {props.errors.password}
          </div>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Подтвердите Пароль</label>

          <div className="auth__input-wrapper">
            <Input
              data-padding-for-status
              type="password"
              value={props.repeatPassword}
              onChange={props.onChangeRepeatPassword}
              placeholder="Введите свой пароль снова"
            />
            <div
              data-error={!!props.errors.repeatPassword}
              className="auth__input-status"
            />
          </div>

          <div
            data-error={!!props.errors.repeatPassword}
            className="auth__input-error"
          >
            {props.errors.repeatPassword}
          </div>
        </div>

        <div className="auth__input-block">
          <label className="auth__label">Промо-код (необязательно)</label>
          <Input
            value={props.promoCode}
            onChange={props.onChangePromoCode}
            placeholder="Введите промо-код"
          />
        </div>

        <div className="auth__input-block auth__input-block_checkbox">
          <Checkbox
            checked={props.agreement}
            onChange={props.onChangeAgreement}
          >
            Я согласен с{" "}
            <i onClick={props.onClickGoAgreement} className="auth__link">
              правилами сервера
            </i>
          </Checkbox>

          <div
            data-error={!!props.errors.agreement}
            className="auth__input-error"
          >
            {props.errors.agreement}
          </div>
        </div>

        <div className="auth__input-block auth__input-block_button">
          <Button disabled={props.loading} onClick={props.onClickSubmit}>
            {props.loading ? "Загрузка" : "Создать"}
          </Button>
        </div>
      </ShellBody>

      <ShellFooter TitleElement={<>Уже есть аккаунт?</>}>
        <Button disabled={props.loading} onClick={props.onClickGoLogin}>
          Войти
        </Button>
      </ShellFooter>
    </div>
  );
}

export { View };
