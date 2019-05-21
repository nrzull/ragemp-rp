import { createStore, combineReducers, applyMiddleware } from "redux";
import * as auth from "@/modules/auth";

interface TGlobalState {
  auth: auth.TState;
  login: auth.login.TState;
  register: auth.register.TState;
  agreement: auth.agreement.TState;
}

const reducer = combineReducers({
  auth: auth.reducer,
  login: auth.login.reducer,
  register: auth.register.reducer,
  agreement: auth.agreement.reducer
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store, TGlobalState };
