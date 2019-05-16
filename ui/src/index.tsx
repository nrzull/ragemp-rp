import "./index.css";
import "@/core/events";

import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store, Store, bus } from "@/core";
import { shared } from "@/shared";

import { Login } from "@/modules/login";

const Container = connect((s: Store) => ({ login: s.login.show }))((p: any) => (
  <>{p.login && <Login />}</>
));

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

bus.triggerServer(shared.events.UI_LOADED);
