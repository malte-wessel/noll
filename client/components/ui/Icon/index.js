import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './styles.scss';

const Icon = props => {
    const { icon, className, padded, ...rest } = props;
    return (
        <i {...rest} className={cn('fa', `fa-${icon}`, padded && styles.padded, className)}/>
    );
};

Icon.propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
    padded: PropTypes.bool
};

export default Icon;
