import React, { createClass, PropTypes } from 'react';
import cn from 'classnames';
import pure from 'recompose/pure';

import Icon from 'components/ui/Icon';
import styles from './styles.scss';

const stringOrNumberType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const getLabel = (options, value) => {
    /* eslint-disable eqeqeq */
    const selected = options.find(({ value: optionValue }) => value == optionValue);
    /* eslint-enable */
    if (!selected) return;
    const { label } = selected;
    return label;
};

const Select = createClass({

    displayName: 'Select',

    propTypes: {
        value: stringOrNumberType.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: stringOrNumberType.isRequired,
            label: stringOrNumberType.isRequired
        })),
        onChange: PropTypes.func.isRequired,
        block: PropTypes.bool,
        className: PropTypes.string,
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
            options,
            onChange,
            block,
            className,
            ...props
        } = this.props;
        /* eslint-enable */

        return (
            <div
                className={cn(
                    styles.container,
                    block && styles.block,
                    className
                )}>
                <div className={styles.inner}>
                    <div className={styles.label}>
                        {getLabel(options, value)}
                    </div>
                    <div className={styles.arrow}>
                        <Icon icon="chevron-down"/>
                    </div>
                </div>
                <select
                    value={value}
                    onChange={this.handleChange}
                    className={styles.select}>
                    {options.map(({ value: optionValue, label }) =>
                        <option key={optionValue} value={optionValue}>{label}</option>
                    )}
                </select>
            </div>
        );
    }
});

export default pure(Select);
