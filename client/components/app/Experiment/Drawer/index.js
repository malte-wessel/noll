import cn from 'classnames';
import React, { PropTypes } from 'react';

import Panel from 'components/ui/Panel';
import Select from 'components/ui/Select';

import Controls from './Controls';
import enhance from './enhance';
import styles from './styles.scss';

const Drawer = props => {
    const { id, experimentOptions, router, className } = props;
    return (
        <div className={cn(styles.container, className)}>
            <Panel className={styles.panelMain}>
                <Select
                    onChange={value => router.push(`/${value}`)}
                    options={experimentOptions}
                    value={id}
                    block/>
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
    experimentOptions: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Drawer);
