import React, { PropTypes, createClass } from 'react';
import cn from 'classnames';

import Icon from 'components/ui/Icon';
import styles from './styles.scss';

function getLabel(options, value) {
    /* eslint-disable eqeqeq */
    const selected = options.find(({ value: optionValue }) => value == optionValue);
    /* eslint-enable */
    if (!selected) return;
    const { label } = selected;
    return label;
}

export default createClass({

    displayName: 'Select',

    propTypes: {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        options: React.PropTypes.arrayOf(React.PropTypes.object),
        onChange: PropTypes.func.isRequired,
        block: PropTypes.bool,
        className: PropTypes.string,
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
                    onChange={onChange}
                    className={styles.select}>
                    {options.map(({ value: optionValue, label }) =>
                        <option key={optionValue} value={optionValue}>{label}</option>
                    )}
                </select>
            </div>
        );
    }
});
