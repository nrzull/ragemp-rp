import { createStore, combineReducers, applyMiddleware } from "redux";
import * as login from "@/modules/login";
import * as register from "@/modules/register";

interface TGlobalState {
  login: login.TState;
  register: register.TState;
}

const reducer = combineReducers({
  login: login.reducer,
  register: register.reducer
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store, TGlobalState };
