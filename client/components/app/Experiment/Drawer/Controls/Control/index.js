import cn from 'classnames';
import keys from 'lodash/keys';
import React, { PropTypes } from 'react';
import validate, { isNotUndefined, isOneOf } from 'utils/validate';
import Icon from 'components/ui/Icon';

import controlSpecs from './controlSpecs';
import enhance from './enhance';
import styles from './styles.scss';

const types = keys(controlSpecs);

const defaultRules = [
    isNotUndefined('key'),
    isNotUndefined('label'),
    isNotUndefined('value'),
    isOneOf('type', types)
];

const Control = props => {
    const { control, className, ...rest } = props;
    const { label, key, type } = control;
    const { Component, rules } = controlSpecs[type] || {};
    const finalRules = defaultRules.concat(rules);
    const message = validate(finalRules, control);
    if (message) {
        return (
            <div className={className}>
                <div className={styles.head}>
                    <div className={styles.icon}>
                        <Icon icon="warning" padded/>
                    </div>
                    <div className={styles.title}>
                        Invalid config for control `{label || key}`
                    </div>
                </div>
                <p className={styles.message}>{message}</p>
            </div>
        );
    }
    return (
        <Component
            className={cn(styles.control, className)}
            control={control}
            {...rest}/>
    );
};

Control.propTypes = {
    control: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Control);
