import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducer';

export default function configure(initialState) {
    const logger = createLogger();
    const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
    const store = createStoreWithMiddleware(reducer, initialState);
    return store;
}
