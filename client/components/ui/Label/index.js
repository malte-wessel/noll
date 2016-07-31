import React, { PropTypes } from 'react';
import cn from 'classnames';
import pure from 'recompose/pure';
import styles from './styles.scss';

const Label = ({ className, ...props }) => (
    <div className={cn(styles.label, className)} {...props}/>
);

Label.propTypes = {
    className: PropTypes.string
};

export default pure(Label);
