import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancer(applyMiddleware(thunk));

const store = createStore(rootReducer, middleware);

export default store;
