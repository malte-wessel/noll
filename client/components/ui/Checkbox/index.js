import cn from 'classnames';
import React, { PropTypes, createClass } from 'react';

import style from './style.scss';

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
            <div
                className={cn(className, style.container)}
                {...props}>
                <label className={style.wrap}>
                    <div className={style.columnCheckbox}>
                        <input
                            type="checkbox"
                            onChange={this.handleChange}
                            checked={!!value}
                            className={style.checkbox}/>
                        <div className={style.custom}/>
                    </div>
                    <div className={style.columnLabel}>
                        {label}
                    </div>
                </label>
            </div>
        );
    }
});
