import { createStore, combineReducers, applyMiddleware } from "redux";
import * as auth from "@/modules/auth";
import * as lobby from "@/modules/lobby";

interface TGlobalState {
  auth: auth.TState;
  login: auth.login.TState;
  register: auth.register.TState;
  agreement: auth.agreement.TState;
  lobby: lobby.TState;
}

const reducer = combineReducers({
  auth: auth.reducer,
  login: auth.login.reducer,
  register: auth.register.reducer,
  agreement: auth.agreement.reducer,
  lobby: lobby.reducer
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store, TGlobalState };
