import React, { PropTypes } from 'react';
import Player from './Player';
import Transport from './Transport';
import Drawer from './Drawer';

import enhance from './enhance';
import styles from './styles.scss';

const Experiment = props => {
    const { id, exists } = props;
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.stage}>
                    {exists && id && <Player key={id} id={id} className={styles.player}/>}
                </div>
                <Transport id={exists && id ? id : undefined} className={styles.transport}/>
            </div>
            <Drawer id={exists && id ? id : undefined} className={styles.drawer}/>
        </div>
    );
};

Experiment.propTypes = {
    id: PropTypes.string,
    exists: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default enhance(Experiment);
