import "@/index.scss";
import "@/web/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "@/core";

import {
  Switch,
  BrowserRouter,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";

import * as Auth from "@/modules/auth";
import * as Lobby from "@/modules/lobby";

const Link = p => (
  <NavLink {...p} className="web__link" activeClassName="web__link_active">
    {p.children}
  </NavLink>
);

function Container(props) {
  return (
    <div className="web">
      <BrowserRouter>
        <>
          <nav className="web__navigation">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/register">Register</Link>
            <Link to="/auth/agreement">Agreement</Link>
            <Link to="/lobby/create">Create Character</Link>
          </nav>

          <div className="web__main">
            <Switch>
              <Route
                path="/auth/login"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Auth.login.Login />
                  </div>
                )}
              />

              <Route
                path="/auth/register"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Auth.register.Register />
                  </div>
                )}
              />

              <Route
                path="/auth/agreement"
                render={() => (
                  <div className="web__view web__view_welcome">
                    <Auth.agreement.Agreement />
                  </div>
                )}
              />

              <Route
                path="/lobby/create"
                render={() => (
                  <div className="web__view web__view_lobby">
                    <Lobby.create.Create />
                  </div>
                )}
              />
              <Redirect to="/auth/login" />
            </Switch>
          </div>
        </>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
