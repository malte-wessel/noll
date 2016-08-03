import React, { PropTypes } from 'react';
import Checkbox from 'components/ui/Checkbox';
import enhance from './enhance';

const BooleanControl = props => {
    const { control, value, onChange, className } = props;
    const { label } = control;
    return (
        <Checkbox
            value={value}
            onChange={onChange}
            label={label}
            className={className}/>
    );
};

BooleanControl.propTypes = {
    control: PropTypes.object.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};


export default enhance(BooleanControl);
