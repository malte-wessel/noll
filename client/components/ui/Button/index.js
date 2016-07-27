import React, { PropTypes, createClass } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import styles from './styles.scss';

export default createClass({

    displayName: 'Button',

    propTypes: {
        appearance: PropTypes.oneOf(['default', 'invert']),
        icon: PropTypes.string,
        to: PropTypes.string,
        block: PropTypes.bool,
        active: PropTypes.bool,
        align: PropTypes.oneOf(['left', 'right', 'center']),
        children: PropTypes.node,
        className: PropTypes.string,
    },

    getDefaultProps() {
        return {
            align: 'center',
            appearance: 'default'
        };
    },

    renderInner() {
        const { icon, children } = this.props;
        return [
            icon && <Icon icon={icon} className={styles.icon} key="icon"/>,
            children && <span className={styles.label} key="label">{children}</span>
        ];
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            appearance,
            icon,
            to,
            block,
            active,
            align,
            children,
            className,
            ...props
        } = this.props;
        /* eslint-enable */

        const finalClassName = cn(
            styles.button,
            styles[`appearance-${appearance}`],
            styles[`align-${align}`],
            block && styles.block,
            active && styles.active,
            className
        );

        const finalChildren = this.renderInner();

        if (to) {
            return (
                <Link to={to} className={finalClassName} {...props}>
                    {finalChildren}
                </Link>
            );
        }

        return (
            <button className={finalClassName} {...props}>
                {finalChildren}
            </button>
        );
    }
});
