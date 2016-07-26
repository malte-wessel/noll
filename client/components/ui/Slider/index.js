import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import styles from './styles.scss';

function fitStep(value, step) {
    const float = value.toString().split('.')[1];
    const pow = float && float.length || 0;
    const mult = Math.pow(10, pow);
    return Math.round(value / step) * (step * mult) / mult;
}

function round(number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
        const decimalPower = Math.pow(10, decimals);
        return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }
    return NaN;
}

function getMousePosition(event) {
    return {
        x: event.pageX,
        y: event.pageY
    };
}

function getTouchPosition(event) {
    return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
    };
}

function pauseEvent(event) {
    event.stopPropagation();
    event.preventDefault();
}

function addEventsToDocument(eventMap) {
    for (const key in eventMap) {
        if (!eventMap.hasOwnProperty(key)) continue;
        document.addEventListener(key, eventMap[key], false);
    }
}

function removeEventsFromDocument(eventMap) {
    for (const key in eventMap) {
        if (!eventMap.hasOwnProperty(key)) continue;
        document.removeEventListener(key, eventMap[key], false);
    }
}

function noop() {}

const stringOrNumberType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

export default createClass({

    displayName: 'Slider',

    propTypes: {
        className: PropTypes.string,
        editable: PropTypes.bool,
        max: stringOrNumberType,
        min: stringOrNumberType,
        step: stringOrNumberType,
        value: stringOrNumberType.isRequired,
        showValue: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    },

    getDefaultProps() {
        return {
            editable: false,
            max: 100,
            min: 0,
            step: 0.01,
            value: 0,
            showValue: true
        };
    },

    getInitialState() {
        return {
            inputFocused: false,
            inputValue: null,
            sliderLength: 0,
            sliderStart: 0
        };
    },

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.inputFocused && nextState.inputFocused) return false;
        if (this.state.inputFocused && this.props.value !== nextProps.value) {
            this.setState({ inputValue: this.valueForInput(nextProps.value) });
            return false;
        }
        return true;
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },

    getKeyboardEvents() {
        return {
            keydown: this.handleKeyDown
        };
    },

    getMouseEventMap() {
        return {
            mousemove: this.handleMouseMove,
            mouseup: this.handleMouseUp
        };
    },

    getTouchEventMap() {
        return {
            touchmove: this.handleTouchMove,
            touchend: this.handleTouchEnd
        };
    },

    handleKeyDown(event) {
        if ([13, 27].indexOf(event.keyCode) !== -1) {
            findDOMNode(this).blur();
        }
        if (event.keyCode === 38) this.addToValue(this.props.step);
        if (event.keyCode === 40) this.addToValue(-this.props.step);
    },

    handleMouseDown(event) {
        addEventsToDocument(this.getMouseEventMap());
        this.start(getMousePosition(event));
        pauseEvent(event);
    },

    handleMouseMove(event) {
        pauseEvent(event);
        this.move(getMousePosition(event));
    },

    handleMouseUp() {
        this.end(this.getMouseEventMap());
    },

    handleResize(event, callback = noop) {
        const { left, right } = findDOMNode(this.refs.progressbar).getBoundingClientRect();
        this.setState({ sliderStart: left, sliderLength: right - left }, callback);
    },

    handleSliderBlur() {
        removeEventsFromDocument(this.getKeyboardEvents());
    },

    handleSliderFocus() {
        addEventsToDocument(this.getKeyboardEvents());
    },

    handleTouchEnd() {
        this.end(this.getTouchEventMap());
    },

    handleTouchMove(event) {
        this.move(getTouchPosition(event));
    },

    handleTouchStart(event) {
        this.start(getTouchPosition(event));
        addEventsToDocument(this.getTouchEventMap());
        pauseEvent(event);
    },

    addToValue(increment) {
        let value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
        value = this.trimValue(value + increment);
        if (value !== this.props.value) this.props.onChange(value);
    },

    end(events) {
        removeEventsFromDocument(events);
        this.setState({ pressed: false });
    },

    knobOffset() {
        const { max, min } = this.props;
        return this.state.sliderLength * (this.props.value - min) / (max - min);
    },

    move(position) {
        const newValue = this.positionToValue(position);
        if (newValue !== this.props.value) this.props.onChange(newValue);
    },

    positionToValue(position) {
        const { sliderStart: start, sliderLength: length } = this.state;
        const { max, min } = this.props;
        return this.trimValue((position.x - start) / length * (max - min) + min);
    },

    start(position) {
        this.handleResize(null, () => {
            this.setState({ pressed: true });
            this.props.onChange(this.positionToValue(position));
        });
    },

    stepDecimals() {
        return (this.props.step.toString().split('.')[1] || []).length;
    },

    trimValue(value) {
        if (value < this.props.min) return this.props.min;
        if (value > this.props.max) return this.props.max;
        return fitStep(round(value, this.stepDecimals()), this.props.step);
    },

    valueForInput(value) {
        const decimals = this.stepDecimals();
        return decimals > 0 ? value.toFixed(decimals) : value.toString();
    },

    calculateRatio(value) {
        if (value < this.props.min) return 0;
        if (value > this.props.max) return 1;
        return (value - this.props.min) / (this.props.max - this.props.min);
    },

    renderProgess() {
        const valueStyle = {
            transform: `scaleX(${this.calculateRatio(this.props.value)})`
        };

        return (
            <div className={styles.progress}>
                <div
                    ref="progressbar"
                    className={styles.innerprogress}
                    max={this.props.max}
                    min={this.props.min}
                    value={this.props.value}>
                    <span
                        className={styles.progressValue}
                        style={valueStyle}/>
                </div>
            </div>
        );
    },

    render() {
        const { editable, showValue } = this.props;
        const knobStyle = { transform: `translateX(${this.knobOffset()}px)` };
        const className = cn(styles.root, {
            [styles.editable]: editable,
            [styles.pressed]: this.state.pressed
        }, this.props.className);

        return (
            <div
                className={className}
                onBlur={this.handleSliderBlur}
                onFocus={this.handleSliderFocus}
                tabIndex="0">
                <div
                    ref="slider"
                    className={styles.container}
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleTouchStart}>
                    <div
                        ref="knob"
                        className={styles.knob}
                        onMouseDown={this.handleMouseDown}
                        onTouchStart={this.handleTouchStart}
                        style={knobStyle}>
                        <div className={styles.innerknob}/>
                    </div>
                    {this.renderProgess()}
                </div>
                {showValue &&
                    <div className={styles.value}>
                        {this.props.value}
                    </div>
                }
            </div>
        );
    }
});
