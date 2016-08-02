import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app/App';
import Choose from './components/app/Choose';
import Experiment from './components/app/Experiment';
import createStore from './store';
import { setExperiments, clearExperiment } from './actions';
import './style.scss';

module.exports = function createClient() {
    const store = createStore();
    const rootEl = document.getElementById('root');
    const onEnterExperiment = () => store.dispatch(clearExperiment());
    render((
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Choose}/>
                    <Route path="(:id)" component={Experiment} onEnter={onEnterExperiment}/>
                </Route>
            </Router>
        </Provider>
    ), rootEl);
    return experiments => store.dispatch(setExperiments(experiments));
};
