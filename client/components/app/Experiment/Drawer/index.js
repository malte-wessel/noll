import cn from 'classnames';
import React, { PropTypes } from 'react';

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
            <Scrollbars>
                <div className={styles.section}>
                    <Button to="/" icon="chevron-left" align="left" block>{title}</Button>
                </div>
                <div className={styles.section}>
                    <Controls id={id}/>
                </div>
            </Scrollbars>
        </div>
    );
};

Drawer.propTypes = {
    id: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Drawer);
