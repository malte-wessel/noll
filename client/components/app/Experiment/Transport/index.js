import cn from 'classnames';
import React, { PropTypes } from 'react';
import Panel from 'components/ui/Panel';
import Button from 'components/ui/Button';
import ButtonGroup from 'components/ui/ButtonGroup';
import enhance from './enhance';
import styles from './styles.scss';

const Transport = props => {
    const {
        playing,
        repeat,
        zoom,
        zoomIn,
        zoomOut,
        zoomReset,
        canZoomIn,
        canZoomOut,
        play,
        pause,
        step,
        reset,
        toggleRepeat,
        className,
        ...rest
    } = props;

    return (
        <Panel
            className={cn(styles.container, className)}
            bodyClassName={styles.body}
            {...rest}>
            <div className={styles.left}/>
            <div className={styles.center}>
                <ButtonGroup>
                    <Button
                        icon="fast-backward"
                        onClick={reset}/>
                    <Button
                        appearance="invert"
                        icon={playing ? 'pause' : 'play'}
                        onClick={playing ? pause : play}
                        active={playing}/>
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
            <div className={styles.right}>
                <ButtonGroup>
                    <Button
                        icon="minus"
                        disabled={!canZoomOut}
                        onClick={zoomOut}/>
                    <Button
                        className={styles.zoomReset}
                        onClick={zoomReset}>
                        {zoom === 'auto' ? 'Auto' : `${zoom}%`}
                    </Button>
                    <Button
                        icon="plus"
                        disabled={!canZoomIn}
                        onClick={zoomIn}/>
                </ButtonGroup>
            </div>
        </Panel>
    );
};

Transport.propTypes = {
    playing: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    zoom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    zoomIn: PropTypes.func.isRequired,
    zoomOut: PropTypes.func.isRequired,
    zoomReset: PropTypes.func.isRequired,
    canZoomIn: PropTypes.bool.isRequired,
    canZoomOut: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    step: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default enhance(Transport);
