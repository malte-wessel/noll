import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Label from 'components/ui/Label';
import ColorPicker from 'components/ui/ColorPicker';

import enhance from './enhance';
import styles from './styles.scss';

const ColorControl = createClass({

    displayName: 'ColorControl',

    propTypes: {
        control: PropTypes.object.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string
    },

    getInitialState() {
        return {
            open: false
        };
    },

    toggleOpen() {
        const { open } = this.state;
        this.setState({ open: !open });
    },

    handleChange(color) {
        const { onChange } = this.props;
        const { hex } = color;
        onChange(hex);
    },

    render() {
        const { control, value, onChange, className } = this.props;
        const { label } = control;
        const { open } = this.state;
        return (
            <div className={cn(styles.control, className)}>
                <div className={styles.head}>
                    <Label className={styles.label}>{label}</Label>
                    <div className={styles.text}>
                        <Input
                            value={value}
                            onChange={onChange}
                            className={styles.input}
                            block/>
                    </div>
                    <div className={styles.toggle}>
                        <Button
                            active={open}
                            onClick={this.toggleOpen}
                            className={styles.toggleButton}>
                            <div
                                className={styles.toggleIndicator}
                                style={{ backgroundColor: value }}/>
                        </Button>
                    </div>
                </div>
                {open &&
                    <ColorPicker
                        color={value}
                        onChange={this.handleChange}
                        className={styles.picker}/>
                }
            </div>
        );
    }
});

export default enhance(ColorControl);
