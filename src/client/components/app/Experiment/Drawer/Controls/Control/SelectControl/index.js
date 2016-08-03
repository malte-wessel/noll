import cn from 'classnames';
import React, { PropTypes } from 'react';
import Select from 'components/ui/Select';
import Label from 'components/ui/Label';

import enhance from './enhance';
import styles from './styles.scss';

const SelectControl = props => {
    const { control, value, onChange, className } = props;
    const { label, options } = control;
    return (
        <div className={cn(styles.control, className)}>
            <Label className={styles.label}>{label}</Label>
            <div className={styles.input}>
                <Select
                    value={value}
                    options={options}
                    onChange={onChange}
                    block/>
            </div>
        </div>
    );
};

const stringOrNumberType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

SelectControl.propTypes = {
    control: PropTypes.object.isRequired,
    value: stringOrNumberType.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: stringOrNumberType.isRequired,
        label: stringOrNumberType.isRequired
    })),
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default enhance(SelectControl);
