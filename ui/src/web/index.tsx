import "@/index.scss";
import "@/web/index.scss";
import React, { ChangeEvent } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store, TGlobalState } from "@/core/store";

import {
  Switch,
  BrowserRouter,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";

// LOGIN
import { View as Login } from "@/modules/auth/login/view";
import * as loginStore from "@/modules/auth/login/store";

// REGISTER
import { View as Register } from "@/modules/auth/register/view";
import * as registerStore from "@/modules/auth/register/store";

// AGREEMENT
import { View as Agreement } from "@/modules/auth/agreement/view";

interface TProps {
  login: loginStore.TState;
  register: registerStore.TState;
}

function mapStateToProps(state: TGlobalState): TProps {
  return {
    login: state.login,
    register: state.register
  };
}

const Link = p => (
  <NavLink {...p} className="web__link" activeClassName="web__link_active">
    {p.children}
  </NavLink>
);

function Container(props: TProps) {
  const onChange = (view: string, name: string) => (
    ev: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = ev.currentTarget;

    switch (`${view}:${name}`) {
      case "login:username":
        return store.dispatch(loginStore.actions.setUsername(value));

      case "login:password":
        return store.dispatch(loginStore.actions.setPassword(value));

      case "login:remember":
        return store.dispatch(loginStore.actions.setRemember(checked));

      case "register:username":
        return store.dispatch(registerStore.actions.setUsername(value));

      case "register:email":
        return store.dispatch(registerStore.actions.setEmail(value));

      case "register:password":
        return store.dispatch(registerStore.actions.setPassword(value));

      case "register:repeatPassword":
        return store.dispatch(registerStore.actions.setRepeatPassword(value));

      case "register:agreement":
        return store.dispatch(registerStore.actions.setAgreement(checked));

      case "register:promoCode":
        return store.dispatch(registerStore.actions.setPromoCode(value));

      default:
        return;
    }
  };

  const onClickMockup = () => {};

  return (
    <div className="web">
      <BrowserRouter>
        <>
          <nav className="web__navigation">
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>

            <Link to="/agreement">Agreement</Link>
          </nav>

          <div className="web__main">
            <Switch>
              <Route
                path="/login"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Login
                      {...props.login}
                      onClickSubmit={onClickMockup}
                      onClickGoRegister={onClickMockup}
                      onChangeUsername={onChange("login", "username")}
                      onChangePassword={onChange("login", "password")}
                      onChangeRemember={onChange("login", "remember")}
                    />
                  </div>
                )}
              />

              <Route
                path="/register"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Register
                      {...props.register}
                      onClickGoLogin={onClickMockup}
                      onClickSubmit={onClickMockup}
                      onClickGoAgreement={onClickMockup}
                      onChangeUsername={onChange("register", "username")}
                      onChangePassword={onChange("register", "password")}
                      onChangeEmail={onChange("register", "email")}
                      onChangeAgreement={onChange("register", "agreement")}
                      onChangePromoCode={onChange("register", "promoCode")}
                      onChangeRepeatPassword={onChange(
                        "register",
                        "repeatPassword"
                      )}
                    />
                  </div>
                )}
              />

              <Route
                path="/agreement"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Agreement onClickGoRegister={onClickMockup} />
                  </div>
                )}
              />
              <Redirect to="/login" />
            </Switch>
          </div>
        </>
      </BrowserRouter>
    </div>
  );
}

const ConnectedContainer = connect(mapStateToProps)(Container);

function App() {
  return (
    <Provider store={store}>
      <ConnectedContainer />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
