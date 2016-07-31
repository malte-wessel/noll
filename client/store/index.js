import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducer';

export default function configure(initialState) {
    const middlewares = [];
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger();
        middlewares.push(logger);
    }
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    const store = createStoreWithMiddleware(reducer, initialState);
    return store;
}
