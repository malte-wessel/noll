import cn from 'classnames';
import React, { PropTypes } from 'react';
import Icon from 'components/ui/Icon';
import styles from './styles.scss';

const Warning = props => {
    const { children, className, ...rest } = props;
    return (
        <div className={cn(styles.container, className)} {...rest}>
            <div className={styles.icon}>
                <Icon icon="warning" padded/>
            </div>
            <div className={styles.title}>
                {children}
            </div>
        </div>
    );
};

Warning.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Warning;
