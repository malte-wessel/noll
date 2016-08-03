import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import pure from 'recompose/pure';

import styles from './styles.scss';
import {
    fitStep,
    round,
    getMousePosition,
    getTouchPosition,
    pauseEvent,
    addEventsToDocument,
    removeEventsFromDocument,
    noop
} from './helpers';

const stringOrNumberType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

const Slider = createClass({

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
        removeEventsFromDocument(this.getMouseEventMap());
        removeEventsFromDocument(this.getTouchEventMap());
        removeEventsFromDocument(this.getKeyboardEvents());
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
        const { left, right } = findDOMNode(this).getBoundingClientRect();
        this.setState({ sliderStart: left, sliderLength: right - left }, callback);
    },

    handleBlur() {
        removeEventsFromDocument(this.getKeyboardEvents());
    },

    handleFocus() {
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

    render() {
        const { value, className } = this.props;
        const scaleX = this.calculateRatio(value);
        const progressStyle = {
            WebkitTransform: `scaleX(${this.calculateRatio(value)})`,
            MsTransform: `scaleX(${this.calculateRatio(value)})`,
            transform: `scaleX(${scaleX})`
        };
        return (
            <div
                className={cn(styles.container, className)}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}
                tabIndex="0">
                <div
                    className={styles.progress}
                    style={progressStyle}/>
            </div>
        );
    }
});

export default pure(Slider);
