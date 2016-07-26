import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configure(initialState) {
    const logger = createLogger();
    const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}
