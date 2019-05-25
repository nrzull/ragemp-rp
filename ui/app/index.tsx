// TODO adapt polyfills for typescript
// import "core-js";

import "@app/index.scss";
import React, { Component } from "react";
import { render } from "react-dom";
import { on, triggerClient } from "@app/bus";
import * as events from "@app/events";

import * as agreement from "@app/agreement";
import * as login from "@app/login";
import * as register from "@app/register";
import * as lobbyCreator from "@app/lobby-creator";

export interface TRootState {
  auth: boolean;

  login: {
    show: boolean;
    username: string;
    password: string;
    remember: boolean;
    loading: boolean;
    errors: {
      username: string;
      password: string;
    };
  };

  register: {
    show: boolean;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    promoCode: string;
    agreement: boolean;
    loading: boolean;
    errors: {
      email: string;
      username: string;
      password: string;
      repeatPassword: string;
      promoCode: string;
      agreement: string;
    };
  };

  agreement: {
    show: boolean;
  };

  creator: boolean;
  selector: boolean;
}

class App extends Component<{}, TRootState> {
  constructor(p) {
    super(p);

    this.state = {
      auth: false,

      login: {
        show: false,
        username: "",
        password: "",
        loading: false,
        remember: false,
        errors: {
          username: "",
          password: ""
        }
      },

      register: {
        show: false,
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        promoCode: "",
        agreement: false,
        loading: false,
        errors: {
          username: "",
          email: "",
          password: "",
          promoCode: "",
          agreement: "",
          repeatPassword: ""
        }
      },

      agreement: {
        show: false
      },

      creator: false,
      selector: false
    };
  }

  componentWillMount() {
    on(events.UI_REGISTER_SHOW, payload => {
      this.setState({ register: { ...this.state.register, show: payload } });
    });

    on(events.UI_REGISTER_SUBMIT_OK, () => {
      this.setState(
        {
          login: {
            ...this.state.login,
            username: this.state.register.username,
            password: this.state.register.password,
            remember: true
          },
          register: {
            ...this.state.register,
            show: false
          }
        },
        () => {
          login.service.submit(this.state.login);
        }
      );
    });

    on(events.UI_REGISTER_SUBMIT_ERROR, payload => {
      this.setState({
        register: { ...this.state.register, loading: false, errors: payload }
      });
    });

    on(events.UI_LOBBY_CREATOR_SHOW, payload => {
      this.setState({ creator: payload, selector: !payload });
    });

    on(events.UI_LOGIN_SHOW, payload => {
      this.setState({ login: { ...this.state.login, show: payload } });
    });

    on(events.UI_LOGIN_SUBMIT_OK, () => {
      this.setState({
        auth: false,
        login: { ...this.state.login, show: false }
      });
    });

    on(events.UI_AUTH_SHOW, payload => {
      this.setState({
        auth: payload,
        login: { ...this.state.login, show: payload }
      });
    });
  }

  componentDidMount() {
    triggerClient(events.UI_LOADED);
  }

  loginCache = (login: TRootState["login"]) => {
    this.setState({ login: { ...login, show: this.state.login.show } });
  };

  loginSetShow = (show: boolean) =>
    this.setState({ login: { ...this.state.login, show } });

  registerSetShow = (show: boolean) =>
    this.setState({ register: { ...this.state.register, show } });

  registerSetUsername = (username: string) =>
    this.setState({ register: { ...this.state.register, username } });

  registerSetPassword = (password: string) =>
    this.setState({ register: { ...this.state.register, password } });

  registerSetEmail = (email: string) =>
    this.setState({ register: { ...this.state.register, email } });

  registerSetRepeatPassword = (repeatPassword: string) =>
    this.setState({ register: { ...this.state.register, repeatPassword } });

  registerSetPromoCode = (promoCode: string) =>
    this.setState({ register: { ...this.state.register, promoCode } });

  registerSetLoading = (loading: boolean) =>
    this.setState({ register: { ...this.state.register, loading } });

  registerSetAgreement = (agreement: boolean) =>
    this.setState({ register: { ...this.state.register, agreement } });

  registerSetErrors = (errors: any = {}) =>
    this.setState({ register: { ...this.state.register, errors } });

  agreementSetShow = (payload: boolean) =>
    this.setState({ agreement: { ...this.state.agreement, show: payload } });

  render() {
    return (
      <>
        {this.state.creator && (
          <div className="lobby lobby_create">
            <lobbyCreator.LobbyCreator />
          </div>
        )}

        {this.state.auth && (
          <>
            <div className="auth-block">
              {this.state.login.show && (
                <login.Login
                  cache={this.state.login}
                  actions={{
                    loginCache: this.loginCache,
                    loginSetShow: this.loginSetShow,
                    registerSetShow: this.registerSetShow
                  }}
                />
              )}

              {this.state.register.show && (
                <register.Register
                  store={this.state.register}
                  actions={{
                    registerSetShow: this.registerSetShow,
                    registerSetUsername: this.registerSetUsername,
                    registerSetPassword: this.registerSetPassword,
                    registerSetLoading: this.registerSetLoading,
                    registerSetPromoCode: this.registerSetPromoCode,
                    registerSetRepeatPassword: this.registerSetRepeatPassword,
                    registerSetEmail: this.registerSetEmail,
                    registerSetAgreement: this.registerSetAgreement,
                    loginSetShow: this.loginSetShow,
                    agreementSetShow: this.agreementSetShow
                  }}
                />
              )}

              {this.state.agreement.show && (
                <agreement.Agreement
                  actions={{
                    agreementSetShow: this.agreementSetShow,
                    registerSetShow: this.registerSetShow
                  }}
                />
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

render(<App />, document.getElementById("root"));
