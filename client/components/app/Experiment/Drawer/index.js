import cn from 'classnames';
import React, { PropTypes } from 'react';

import Button from 'components/ui/Button';
import Panel from 'components/ui/Panel';
import Select from 'components/ui/Select';
import Warning from 'components/ui/Warning';

import Controls from './Controls';
import enhance from './enhance';
import styles from './styles.scss';

const Drawer = props => {
    const { id, experimentOptions, warnings, showDrawer, router, actions, className } = props;
    const { toggleDrawer } = actions;
    return (
        <div className={cn(styles.container, className, showDrawer && styles.showDrawer)}>
            <Button
                className={styles.toggleDrawerFlyOut}
                icon="chevron-left"
                onClick={toggleDrawer}/>
            <div className={styles.drawer}>
                <Panel className={styles.panelMain}>
                    <div className={styles.panelMainSplit}>
                        <div className={styles.panelMainLeft}>
                            <Select
                                placeholder="Choose experiment"
                                onChange={value => router.push(`/${value}`)}
                                options={experimentOptions}
                                value={id}
                                block/>
                        </div>
                        <div className={styles.panelMainRight}>
                            <Button
                                icon="chevron-right"
                                onClick={toggleDrawer}/>
                        </div>
                    </div>
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
        </div>
    );
};

Drawer.propTypes = {
    id: PropTypes.string,
    experimentOptions: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    showDrawer: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Drawer);
