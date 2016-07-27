import map from 'lodash/map';
import cn from 'classnames';
import React, { PropTypes } from 'react';

import Panel from 'components/ui/Panel';
import Button from 'components/ui/Button';
import enhance from './enhance';
import styles from './styles.scss';

const Choose = props => {
    const { experimentsById, className } = props;
    return (
        <div className={cn(styles.container, className)}>
            <Panel
                icon="bars"
                title="Choose experiment"
                className={styles.panel}>
                {map(experimentsById, (experiment, id) => {
                    const { config } = experiment;
                    const { title } = config;
                    return (
                        <Button
                            key={id}
                            icon="lightbulb-o"
                            to={`/${id}`}
                            align="left"
                            block>
                                {title}
                        </Button>
                    );
                })}
            </Panel>
        </div>
    );
};

Choose.propTypes = {
    experimentsById: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Choose);
