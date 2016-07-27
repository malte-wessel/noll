import React, { PropTypes } from 'react';
import cn from 'classnames';

import Icon from 'components/ui/Icon';
import Scrollbars from 'components/ui/Scrollbars';
import styles from './styles.scss';

const scrollbarsStyle = {
    width: 'auto',
    height: 'auto'
};

const Panel = props => {
    const {
        title,
        icon,
        scrollable,
        children,
        className,
        bodyClassName,
        ...rest
    } = props;

    const body = (
        <div className={cn(styles.body, bodyClassName)}>
            {children}
        </div>
    );

    return (
        <div
            className={cn(
                styles.container,
                scrollable && styles.scrollable,
                className
            )}
            {...rest}>
            {title &&
                <div className={styles.title}>
                    {icon && <Icon icon={icon} padded/>}
                    {title}
                </div>
            }
            {scrollable
                ? <Scrollbars
                    style={scrollbarsStyle}
                    className={styles.scrollbars}>
                    {body}
                </Scrollbars>
                : body
            }
        </div>
    );
};

Panel.propTypes = {
    title: PropTypes.node,
    icon: PropTypes.string,
    scrollable: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    bodyClassName: PropTypes.string
};

export default Panel;
