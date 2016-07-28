import React, { createClass, PropTypes } from 'react';
import cn from 'classnames';

import Icon from 'components/ui/Icon';
import Scrollbars from 'components/ui/Scrollbars';
import styles from './styles.scss';

const scrollbarsStyle = {
    width: 'auto',
    height: 'auto'
};

const Panel = createClass({

    displayName: 'Panel',

    propTypes: {
        title: PropTypes.node,
        icon: PropTypes.string,
        scrollable: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        bodyClassName: PropTypes.string
    },

    renderBody(props = {}) {
        const { bodyClassName } = this.props;
        return (
            <div className={cn(styles.body, bodyClassName)} {...props}/>
        );
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            title,
            icon,
            scrollable,
            children,
            className,
            bodyClassName,
            ...props
        } = this.props;
        /* eslint-enable */

        return (
            <div
                className={cn(
                    styles.container,
                    scrollable && styles.scrollable,
                    className
                )}
                {...props}>
                {title &&
                    <div className={styles.title}>
                        {icon && <Icon icon={icon} padded/>}
                        {title}
                    </div>
                }
                {scrollable
                    ? <Scrollbars
                        style={scrollbarsStyle}
                        renderView={this.renderBody}
                        className={styles.scrollbars}>
                        {children}
                    </Scrollbars>
                    : this.renderBody({ children })
                }
            </div>
        );
    }
});

export default Panel;
