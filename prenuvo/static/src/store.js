import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from './reducers/index';

export const history = createBrowserHistory();

const middlewares = [];
middlewares.push(thunk);
middlewares.push(routerMiddleware(history));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(reducers(history), middleware);
export default store;
