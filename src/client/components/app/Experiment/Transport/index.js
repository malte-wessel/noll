import cn from 'classnames';
import React, { PropTypes } from 'react';
import Panel from 'components/ui/Panel';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import ButtonGroup from 'components/ui/ButtonGroup';
import enhance from './enhance';
import styles from './styles.scss';

const fpsOptions = [
    { value: 60, label: '60fps' },
    { value: 30, label: '30fps' },
    { value: 15, label: '15fps' },
    { value: 5, label: '5fps' },
    { value: 1, label: '1fps' }
];

const Transport = props => {
    const {
        id,
        playing,
        repeat,
        zoom,
        zoomIn,
        zoomOut,
        zoomReset,
        canZoomIn,
        canZoomOut,
        fps,
        play,
        pause,
        step,
        reset,
        toggleRepeat,
        setFps,
        className,
        ...rest
    } = props;

    const disabled = !id;

    return (
        <Panel
            className={cn(styles.container, className)}
            bodyClassName={styles.body}
            {...rest}>
            <div className={styles.left}>
                <Select
                    disabled={disabled}
                    onChange={setFps}
                    value={fps}
                    options={fpsOptions}/>
            </div>
            <div className={styles.center}>
                <ButtonGroup>
                    <Button
                        icon="fast-backward"
                        disabled={disabled}
                        onClick={reset}/>
                    <Button
                        appearance="invert"
                        icon={playing ? 'pause' : 'play'}
                        onClick={playing ? pause : play}
                        disabled={disabled}
                        active={playing}/>
                    <Button
                        icon="step-forward"
                        disabled={playing || disabled}
                        onClick={step}/>
                </ButtonGroup>
                <ButtonGroup>
                    <Button
                        icon="repeat"
                        onClick={toggleRepeat}
                        disabled={disabled}
                        active={repeat}/>
                </ButtonGroup>
            </div>
            <div className={styles.right}>
                <ButtonGroup>
                    <Button
                        icon="minus"
                        disabled={!canZoomOut || disabled}
                        onClick={zoomOut}/>
                    <Button
                        className={styles.zoomReset}
                        disabled={disabled}
                        onClick={zoomReset}>
                        {zoom === 'auto' ? 'Auto' : `${zoom}%`}
                    </Button>
                    <Button
                        icon="plus"
                        disabled={!canZoomIn || disabled}
                        onClick={zoomIn}/>
                </ButtonGroup>
            </div>
        </Panel>
    );
};

Transport.propTypes = {
    id: PropTypes.string,
    playing: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    zoom: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    zoomIn: PropTypes.func.isRequired,
    zoomOut: PropTypes.func.isRequired,
    zoomReset: PropTypes.func.isRequired,
    canZoomIn: PropTypes.bool.isRequired,
    canZoomOut: PropTypes.bool.isRequired,
    fps: PropTypes.number.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    step: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    setFps: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default enhance(Transport);
