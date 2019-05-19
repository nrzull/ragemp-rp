import React, { Component } from "react";
import { TGlobalState } from "@/core";
import { connect } from "react-redux";
import { Login } from "@/modules/auth/login";
import { Register } from "@/modules/auth/register";

interface TStoreProps {
  login: TGlobalState["login"]["show"];
  register: TGlobalState["register"]["show"];
}

class Container extends Component<TStoreProps> {
  render() {
    return (
      <div className="auth-block">
        {this.props.login && <Login />}
        {this.props.register && <Register />}
      </div>
    );
  }
}

function mapStateToProps(s: TGlobalState): TStoreProps {
  return {
    login: s.login.show,
    register: s.register.show
  };
}

const ConnectedContainer = connect(mapStateToProps)(Container);

export { ConnectedContainer as Container };
