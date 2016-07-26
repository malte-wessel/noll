import React, { PropTypes } from 'react';
import cn from 'classnames';
import style from './style.scss';

const Icon = props => {
    const { icon, className, padded, ...rest } = props;
    return (
        <i {...rest} className={cn('fa', `fa-${icon}`, padded && style.padded, className)}/>
    );
};

Icon.propTypes = {
    icon: PropTypes.string,
    className: PropTypes.string,
    padded: PropTypes.bool
};

export default Icon;
