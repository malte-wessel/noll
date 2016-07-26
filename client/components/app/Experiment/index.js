import React, { PropTypes } from 'react';
import Scrollbars from 'components/ui/Scrollbars';
import Player from './Player';
import Transport from './Transport';
import Drawer from './Drawer';

import enhance from './enhance';
import style from './style.scss';

const Experiment = props => {
    const { id, exists } = props;
    if (!exists) return false;

    return (
        <div className={style.container}>
            <Drawer id={id} className={style.drawer}/>
            <div className={style.main}>
                <Scrollbars>
                    <Player id={id} className={style.player}/>
                </Scrollbars>
                <Transport id={id} className={style.controls}/>
            </div>
        </div>
    );
};

Experiment.propTypes = {
    id: PropTypes.string.isRequired,
    exists: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default enhance(Experiment);
