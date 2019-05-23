import React from "react";
import { TGlobalState } from "@/core";
import { TState } from "./store";
import { connect } from "react-redux";
import { Creator } from "./creator";
import "./styles.scss";

interface TStoreProps {
  selector: TState["selector"];
  creator: TState["selector"];
}

function Container(props: TStoreProps) {
  return (
    <>
      {props.creator && (
        <div className="lobby lobby_create">
          <Creator />
        </div>
      )}
    </>
  );
}

function mapStateToProps(state: TGlobalState): TStoreProps {
  return {
    creator: state.lobby.creator,
    selector: state.lobby.selector
  };
}

const ConnectedContainer = connect(mapStateToProps)(Container);

export { ConnectedContainer as Container };
