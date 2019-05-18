import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as login } from "@/modules/login";
import { reducer as register } from "@/modules/register";

const reducer = combineReducers({
  login,
  register
});

const middlewares = [];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store };
