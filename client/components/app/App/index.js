import React, { PropTypes } from 'react';
import style from './style.scss';

const App = props => {
    const { children } = props;
    return (
        <div className={style.container}>
            {children}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node.isRequired
};

export default App;
