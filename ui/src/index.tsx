// TODO adapt polyfills for typescript
// import "core-js";

import "@/index.scss";
import "@/core/events";

import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store, bus, TGlobalState } from "@/core";
import * as shared from "@/shared";
import * as auth from "./modules/auth";

interface TStoreProps {
  auth: TGlobalState["auth"]["show"];
}

function mapStateToProps(state: TGlobalState): TStoreProps {
  return {
    auth: state.auth.show
  };
}

function Container(props: TStoreProps) {
  return <>{props.auth && <auth.Auth />}</>;
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
