import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from "./reducers";
import { reducer as formReducer } from 'redux-form';
//import { routerMiddleware, routerReducer } from 'react-router-redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export default (history?) => {
  //const middleware = routerMiddleware(history);

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  const enhancer = composeEnhancers(applyMiddleware( thunk));

  return createStore(
    combineReducers({
      reducers,
      form: formReducer,
      //router: routerReducer
    }),
    enhancer
  );
};
