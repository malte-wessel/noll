import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './styles.scss';

const ButtonGroup = props => {
    const { children, className, ...rest } = props;
    return (
        <div className={cn(styles.group, className)} {...rest}>
            {children}
        </div>
    );
};

ButtonGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default ButtonGroup;
