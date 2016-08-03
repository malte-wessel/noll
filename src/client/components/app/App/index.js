import React, { PropTypes } from 'react';
import enhance from './enhance';
import styles from './styles.scss';

const App = props => {
    const { children } = props;
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node.isRequired
};

export default enhance(App);
