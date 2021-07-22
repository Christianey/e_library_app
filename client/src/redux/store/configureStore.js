import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV === "development") middlewares.push(logger);
const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(rootReducer, enhancers);

const persistor = persistStore(store);

export { store, persistor };
