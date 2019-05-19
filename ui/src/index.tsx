// TODO adapt polyfills for typescript
// import "core-js";

import "@/index.scss";
import "@/core/events";

import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store, bus, TGlobalState } from "@/core";
import { shared } from "@/shared";

import * as auth from "./modules/auth";

function mapStateToProps(state: TGlobalState) {
  return {
    login: state.login.show,
    register: state.register.show
  };
}

function Container(props) {
  return (
    <>
      {props.login && <auth.login.Login />}
      {props.register && <auth.register.Register />}
    </>
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

bus.triggerClient(shared.events.UI_LOADED);
