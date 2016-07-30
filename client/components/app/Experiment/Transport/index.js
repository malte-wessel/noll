import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
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

const Transport = createClass({

    displayName: 'Transport',

    propTypes: {
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
    },

    handleChangeFps(event) {
        const { setFps } = this.props;
        const { target } = event;
        const { value } = target;
        setFps(value);
    },

    render() {
        const {
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
        } = this.props;

        return (
            <Panel
                className={cn(styles.container, className)}
                bodyClassName={styles.body}
                {...rest}>
                <div className={styles.left}>
                    <Select
                        onChange={this.handleChangeFps}
                        value={fps}
                        options={fpsOptions}/>
                </div>
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
    }
});

export default enhance(Transport);
