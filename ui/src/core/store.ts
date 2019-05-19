import { createStore, combineReducers, applyMiddleware } from "redux";
import * as auth from "@/modules/auth";

interface TGlobalState {
  login: auth.login.TState;
  register: auth.register.TState;
}

const reducer = combineReducers({
  login: auth.login.reducer,
  register: auth.register.reducer
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store, TGlobalState };
