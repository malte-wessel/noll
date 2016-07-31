import cn from 'classnames';
import React, { PropTypes } from 'react';
import Input from 'components/ui/Input';
import Label from 'components/ui/Label';

import enhance from './enhance';
import styles from './styles.scss';

const TextControl = props => {
    const { control, value, onChange, className } = props;
    const { label } = control;
    return (
        <div className={cn(styles.control, className)}>
            <Label className={styles.label}>{label}</Label>
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
