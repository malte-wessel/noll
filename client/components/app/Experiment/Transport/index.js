import cn from 'classnames';
import React, { PropTypes } from 'react';
import Button from 'components/ui/Button';
import ButtonGroup from 'components/ui/ButtonGroup';
import enhance from './enhance';
import styles from './styles.scss';

const Transport = props => {
    const {
        playing,
        repeat,
        play,
        pause,
        step,
        reset,
        toggleRepeat,
        className,
        ...rest
    } = props;

    return (
        <div className={cn(styles.container, className)} {...rest}>
            <ButtonGroup>
                <Button
                    icon="fast-backward"
                    onClick={reset}/>
                <Button
                    appearance="invert"
                    icon={playing ? 'pause' : 'play'}
                    onClick={playing ? pause : play}/>
                <Button
                    icon="step-forward"
                    disabled={playing}
                    onClick={step}/>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    icon="repeat"
                    onClick={toggleRepeat}
                    active={repeat}/>
            </ButtonGroup>
        </div>
    );
};

Transport.propTypes = {
    playing: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    step: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default enhance(Transport);
