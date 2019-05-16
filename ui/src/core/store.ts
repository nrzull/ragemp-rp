import { createStore, combineReducers, applyMiddleware } from "redux";
import * as login from "@/modules/login";

interface Store {
  login: login.State;
}

const reducer = combineReducers({
  login: login.reducer
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { Store, store };
