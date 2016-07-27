import cn from 'classnames';
import React, { PropTypes, createClass } from 'react';

import styles from './styles.scss';

export default createClass({

    displayName: 'Checkbox',

    propTypes: {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired,
        label: PropTypes.node,
        className: PropTypes.string,
    },

    handleChange(event) {
        const { onChange } = this.props;
        const target = event.target;
        const { checked } = target;
        onChange(!!checked);
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            label,
            className,
            onChange,
            value,
            ...props
        } = this.props;
        /* eslint-enable */

        return (
            <label
                className={cn(
                    className,
                    styles.container
                )}
                {...props}>
                <input
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={!!value}
                    className={styles.checkbox}/>
                <div className={styles.custom}/>
                <div className={styles.label}>
                    {label}
                </div>
            </label>
        );
    }
});
