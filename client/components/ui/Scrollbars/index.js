import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import { Scrollbars as BaseScrollbars } from 'react-custom-scrollbars';
import styles from './styles.scss';

const Scrollbars = createClass({
    propTypes: {
        appearance: PropTypes.oneOf(['default'])
    },
    getDefaultProps() {
        return {
            appearance: 'default'
        };
    },

    renderTrackHorizontal({ style, ...props }) {
        /* eslint-disable no-unused-vars */
        const { height, ...finalStyle } = style;
        /* eslint-enable */
        return <div style={finalStyle} className={styles.trackHorizontal} {...props}/>;
    },

    renderTrackVertical({ style, ...props }) {
        /* eslint-disable no-unused-vars */
        const { width, ...finalStyle } = style;
        /* eslint-enable */
        return <div style={finalStyle} className={styles.trackVertical} {...props}/>;
    },

    renderThumbHorizontal(props) {
        const { appearance } = this.props;
        const className = cn(
            styles.thumbHorizontal,
            styles[`appearance-${appearance}`]
        );
        return <div className={className} {...props}/>;
    },

    renderThumbVertical(props) {
        const { appearance } = this.props;
        const className = cn(
            styles.thumbVertical,
            styles[`appearance-${appearance}`]
        );
        return <div className={className} {...props}/>;
    },

    render() {
        /* eslint-disable no-unused-vars */
        const { appearance, ...rest } = this.props;
        /* eslint-enable */
        return (
            <BaseScrollbars
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderTrackVertical={this.renderTrackVertical}
                renderThumbHorizontal={this.renderThumbHorizontal}
                renderThumbVertical={this.renderThumbVertical}
                {...rest}/>
        );
    }
});

export default Scrollbars;
