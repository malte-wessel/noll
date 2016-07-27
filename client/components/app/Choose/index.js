import map from 'lodash/map';
import cn from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import enhance from './enhance';
import styles from './styles.scss';

const Choose = props => {
    const { experimentsById, className } = props;
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.list}>
                {map(experimentsById, (experiment, id) => {
                    const { config } = experiment;
                    const { title } = config;
                    return (
                        <Link key={id} to={`/${id}`} className={styles.item}>
                            <div className={styles.icon}>
                                <Icon icon="lightbulb-o"/>
                            </div>
                            <div className={styles.label}>
                                {title}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

Choose.propTypes = {
    experimentsById: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Choose);
