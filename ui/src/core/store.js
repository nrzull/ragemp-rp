import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as login } from "@/modules/login";

const reducer = combineReducers({
  login
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store };
