import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import { Scrollbars as BaseScrollbars } from 'react-custom-scrollbars';
import styles from './styles.scss';

const Scrollbars = createClass({

    displayName: 'Scrollbars',

    propTypes: {
        appearance: PropTypes.oneOf(['default']),
        trackHorizontalClassName: PropTypes.string,
        trackVerticalClassName: PropTypes.string,
        thumbHorizontalClassName: PropTypes.string,
        thumbVerticalClassName: PropTypes.string
    },

    getDefaultProps() {
        return {
            appearance: 'default'
        };
    },

    getScrollLeft() {
        return this.refs.scrollbars.getScrollLeft();
    },

    getScrollTop() {
        return this.refs.scrollbars.getScrollTop();
    },

    getValues() {
        return this.refs.scrollbars.getValues();
    },

    scrollLeft(left) {
        this.refs.scrollbars.scrollLeft(left);
    },

    scrollTop(top) {
        this.refs.scrollbars.scrollTop(top);
    },

    renderTrackHorizontal({ style, ...props }) {
        /* eslint-disable no-unused-vars */
        const { height, ...finalStyle } = style;
        /* eslint-enable */
        const { trackHorizontalClassName } = this.props;
        const className = cn(
            styles.trackHorizontal,
            trackHorizontalClassName
        );
        return <div style={finalStyle} className={className} {...props}/>;
    },

    renderTrackVertical({ style, ...props }) {
        /* eslint-disable no-unused-vars */
        const { width, ...finalStyle } = style;
        /* eslint-enable */
        const { trackVerticalClassName } = this.props;
        const className = cn(
            styles.trackVertical,
            trackVerticalClassName
        );
        return <div style={finalStyle} className={className} {...props}/>;
    },

    renderThumbHorizontal(props) {
        const { appearance, thumbVerticalClassName } = this.props;
        const className = cn(
            styles.thumbHorizontal,
            styles[`appearance-${appearance}`],
            thumbVerticalClassName
        );
        return <div className={className} {...props}/>;
    },

    renderThumbVertical(props) {
        const { appearance, thumbVerticalClassName } = this.props;
        const className = cn(
            styles.thumbVertical,
            styles[`appearance-${appearance}`],
            thumbVerticalClassName
        );
        return <div className={className} {...props}/>;
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            appearance,
            trackHorizontalClassName,
            trackVerticalClassName,
            thumbHorizontalClassName,
            thumbVerticalClassName,
            ...rest
        } = this.props;
        /* eslint-enable */
        return (
            <BaseScrollbars
                ref="scrollbars"
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderTrackVertical={this.renderTrackVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                renderThumbVertical={this.renderThumbVertical}
                {...rest}/>
        );
    }
});

export default Scrollbars;
