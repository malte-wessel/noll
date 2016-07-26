import React, { PropTypes, createClass } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import Icon from 'components/ui/Icon';
import style from './style.scss';

export default createClass({

    displayName: 'Button',

    propTypes: {
        appearance: PropTypes.oneOf(['default', 'invert', 'highlight']),
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
            icon && <Icon icon={icon} className={style.icon} key="icon"/>,
            children && <span className={style.label} key="label">{children}</span>
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
            style.button,
            style[`appearance-${appearance}`],
            style[`align-${align}`],
            block && style.block,
            active && style.active,
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
