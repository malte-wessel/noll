import reduce from 'lodash/reduce';
import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import Button from 'components/ui/Button';

import Control from './Control';
import enhance from './enhance';
import styles from './styles.scss';

const Controls = createClass({

    displayName: 'Controls',

    propTypes: {
        controls: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        className: PropTypes.string
    },

    componentWillMount() {
        this.collectHandler();
    },

    componentWillUpdate(nextProps) {
        this.collectHandler(nextProps);
    },

    collectHandler(props = this.props) {
        const { controls, actions } = props;
        const { setValue } = actions;
        this.handlers = reduce(controls, (acc, { key }) => {
            const prevHandler = this.handlers && this.handlers[key];
            acc[key] = prevHandler || (value => setValue(key, value));
            return acc;
        }, {});
    },

    renderControl(control) {
        const { values } = this.props;
        const { key } = control;
        return (
            <Control
                key={key}
                control={control}
                value={values[key]}
                onChange={this.handlers[key]}
                className={styles.control}/>
        );
    },

    render() {
        const { controls, actions, className } = this.props;
        const { resetValues } = actions;

        return (
            <div className={cn(styles.container, className)}>
                {controls.length ?
                    <div className={styles.controls}>
                        {controls.map(this.renderControl)}
                        <div className={styles.actions}>
                            <Button
                                onClick={resetValues}
                                icon="times"
                                block>
                                Use defaults
                            </Button>
                        </div>
                    </div> :
                    <div className={styles.nocontrols}>
                        You haven't defined any controls.
                    </div>
                }
            </div>
        );
    }
});

export default enhance(Controls);
