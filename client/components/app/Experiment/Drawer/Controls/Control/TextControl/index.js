import cn from 'classnames';
import React, { PropTypes } from 'react';
import Input from 'components/ui/Input';

import enhance from './enhance';
import styles from './styles.scss';

const TextControl = props => {
    const { control, value, onChange, className } = props;
    const { label } = control;
    return (
        <div className={cn(styles.control, className)}>
            <div className={styles.label}>{label}</div>
            <div className={styles.input}>
                <Input
                    value={value}
                    onChange={onChange}
                    block/>
            </div>
        </div>
    );
};

TextControl.propTypes = {
    control: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default enhance(TextControl);
