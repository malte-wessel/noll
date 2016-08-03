import React, { PropTypes } from 'react';
import cn from 'classnames';
import pure from 'recompose/pure';
import { CustomPicker as customPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import styles from './styles.scss';

const HuePointer = () => <div className={styles.huePointer}/>;

const ColorPicker = props => {
    const { className, ...rest } = props;
    return (
        <div className={cn(styles.container, className)}>
            <div className={cn(styles.control, styles.saturation)}>
                <Saturation {...rest}/>
            </div>
            <div className={styles.control}>
                <Hue pointer={HuePointer} {...rest}/>
            </div>
        </div>
    );
};

ColorPicker.propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default pure(customPicker(ColorPicker));
