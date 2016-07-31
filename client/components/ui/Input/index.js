import React, { createClass, PropTypes } from 'react';
import cn from 'classnames';
import pure from 'recompose/pure';
import styles from './styles.scss';

const types = [
    'date',
    'datetime',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'tel',
    'text',
    'time',
    'search',
    'url',
    'week'
];

const Input = createClass({

    displayName: 'Input',

    propTypes: {
        value: PropTypes.string.isRequired,
        type: PropTypes.oneOf(types),
        onChange: PropTypes.func.isRequired,
        block: PropTypes.bool,
        className: PropTypes.string,
    },

    getDefaultProps() {
        return { type: 'text' };
    },

    handleChange(event) {
        const { onChange } = this.props;
        const { target } = event;
        const { value } = target;
        onChange(value);
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            value,
            type,
            onChange,
            block,
            className,
            ...props
        } = this.props;
        /* eslint-enable */

        return (
            <input
                type={type}
                value={value}
                onChange={this.handleChange}
                className={cn(
                    styles.input,
                    block && styles.block,
                    className
                )}
                {...props}/>
        );
    }
});

export default pure(Input);
