import React, { PropTypes } from 'react';
import Scrollbars from 'components/ui/Scrollbars';
import Player from './Player';
import Transport from './Transport';
import Drawer from './Drawer';

import enhance from './enhance';
import styles from './styles.scss';

const Experiment = props => {
    const { id, exists } = props;
    if (!exists) return false;

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Scrollbars className={styles.stage}>
                    <Player id={id} className={styles.player}/>
                </Scrollbars>
                <Transport id={id} className={styles.transport}/>
            </div>
            <Drawer id={id} className={styles.drawer}/>
        </div>
    );
};

Experiment.propTypes = {
    id: PropTypes.string.isRequired,
    exists: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default enhance(Experiment);
