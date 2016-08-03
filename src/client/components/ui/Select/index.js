import React, { createClass, PropTypes } from 'react';
import cn from 'classnames';
import pure from 'recompose/pure';

import Label from 'components/ui/Label';
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
        value: stringOrNumberType,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: stringOrNumberType.isRequired,
            label: stringOrNumberType.isRequired,
            disabled: PropTypes.bool
        })),
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
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
            disabled,
            placeholder,
            block,
            className,
            ...props
        } = this.props;
        /* eslint-enable */

        const finalOptions = placeholder
            ? [{ value: '', label: placeholder, disabled: true }].concat(options)
            : options;

        const finalValue = placeholder && !value ? '' : value;

        return (
            <div
                className={cn(
                    styles.container,
                    block && styles.block,
                    disabled && styles.disabled,
                    className
                )}>
                <div className={styles.inner}>
                    <Label className={styles.label}>
                        {getLabel(finalOptions, finalValue)}
                    </Label>
                    <div className={styles.arrow}>
                        <Icon icon="chevron-down"/>
                    </div>
                </div>
                <select
                    value={finalValue}
                    onChange={this.handleChange}
                    className={styles.select}
                    disabled={disabled}>
                    {finalOptions.map(({ value: optionValue, label, disabled: optionDisabled }) =>
                        <option
                            key={optionValue}
                            value={optionValue}
                            disabled={optionDisabled}>
                            {label}
                        </option>
                    )}
                </select>
            </div>
        );
    }
});

export default pure(Select);
