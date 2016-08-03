import cn from 'classnames';
import React, { PropTypes } from 'react';

import Panel from 'components/ui/Panel';
import Select from 'components/ui/Select';
import Warning from 'components/ui/Warning';

import Controls from './Controls';
import enhance from './enhance';
import styles from './styles.scss';

const Drawer = props => {
    const { id, experimentOptions, warnings, router, className } = props;
    return (
        <div className={cn(styles.container, className)}>
            <Panel className={styles.panelMain}>
                <Select
                    placeholder="Choose experiment"
                    onChange={value => router.push(`/${value}`)}
                    options={experimentOptions}
                    value={id}
                    block/>
                <div className={styles.warnings}>
                    {warnings.map(warning => (
                        <Warning className={styles.warning}>{warning}</Warning>
                    ))}
                </div>
            </Panel>
            {id &&
                <Panel
                    className={styles.panelControls}
                    title="Controls"
                    icon="sliders"
                    scrollable>
                    <Controls id={id}/>
                </Panel>
            }
        </div>
    );
};

Drawer.propTypes = {
    id: PropTypes.string,
    experimentOptions: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Drawer);
