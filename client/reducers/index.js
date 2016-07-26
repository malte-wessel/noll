import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import experiments from './experiments';

export default combineReducers({
    routing,
    experiments
});
