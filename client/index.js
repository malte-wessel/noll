import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/app/App';
import Choose from './components/app/Choose';
import Experiment from './components/app/Experiment';
import createStore from './store';
import { set } from './actions/experiments';
import './style.scss';

export default function createClient() {
    const store = createStore();
    const history = syncHistoryWithStore(browserHistory, store);
    const rootEl = document.getElementById('root');
    render((
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Choose}/>
                    <Route path="(:id)" component={Experiment} onEnter={({ params }) => console.log('Enter', params)}/>
                </Route>
            </Router>
        </Provider>
    ), rootEl);
    return experiments => store.dispatch(set(experiments));
}
