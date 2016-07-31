import cn from 'classnames';
import React, { PropTypes } from 'react';
import Slider from 'components/ui/Slider';

import enhance from './enhance';
import styles from './styles.scss';

const NumberControl = props => {
    const { control, value, onChange, className } = props;
    const { label, min, max, step } = control;
    return (
        <div className={cn(styles.control, className)}>
            <div className={styles.head}>
                <div className={styles.label}>{label}</div>
                <div className={styles.value}>{value}</div>
            </div>
            <Slider
                showValue={false}
                className={styles.input}
                key="input"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}/>
        </div>
    );
};

NumberControl.propTypes = {
    control: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default enhance(NumberControl);
