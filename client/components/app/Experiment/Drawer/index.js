import cn from 'classnames';
import React, { PropTypes } from 'react';

import Panel from 'components/ui/Panel';
import Button from 'components/ui/Button';
import Scrollbars from 'components/ui/Scrollbars';

import Controls from './Controls';
import enhance from './enhance';
import styles from './styles.scss';

const Drawer = props => {
    const { id, config, className } = props;
    const { title } = config;
    return (
        <div className={cn(styles.container, className)}>
            <Panel className={styles.panelMain}>
                <Button to="/" icon="bars" align="left" block>{title}</Button>
            </Panel>
            <Panel
                 className={styles.panelControls}
                title="Controls"
                icon="sliders"
                scrollable>
                <Controls id={id}/>
            </Panel>
        </div>
    );
};

Drawer.propTypes = {
    id: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Drawer);
