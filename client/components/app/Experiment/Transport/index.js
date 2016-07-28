import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import Panel from 'components/ui/Panel';
import Button from 'components/ui/Button';
import ButtonGroup from 'components/ui/ButtonGroup';
import enhance from './enhance';
import styles from './styles.scss';

const zoomSteps = [
    1, 1.5, 2, 3, 4, 5, 6.25, 8.33, 12.5, 16.67, 25, 33.33, 50, 66.67, 100,
    200, 300, 400, 500, 600, 700, 800, 1200, 1600, 32000
];

const Transport = createClass({

    displayName: 'Transport',

    propTypes: {
        playing: PropTypes.bool.isRequired,
        repeat: PropTypes.bool.isRequired,
        zoom: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        step: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        toggleRepeat: PropTypes.func.isRequired,
        setZoom: PropTypes.func.isRequired,
        className: PropTypes.string
    },

    handleZoomOut() {
        const { zoom, setZoom } = this.props;
        if (zoom === 'auto') return setZoom(100);
        const idx = zoomSteps.indexOf(zoom);
        setZoom(zoomSteps[idx - 1]);
    },
    handleZoomReset() {
        const { zoom, setZoom } = this.props;
        if (zoom === 'auto') setZoom(100);
        else setZoom('auto');
    },

    handleZoomIn() {
        const { zoom, setZoom } = this.props;
        if (zoom === 'auto') return setZoom(100);
        const idx = zoomSteps.indexOf(zoom);
        setZoom(zoomSteps[idx + 1]);
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            playing,
            repeat,
            zoom,
            play,
            pause,
            step,
            reset,
            toggleRepeat,
            setZoom,
            className,
            ...props
        } = this.props;
        /* eslint-enable */

        const canZoomIn = zoom === 'auto' || zoomSteps.indexOf(zoom) < zoomSteps.length - 1;
        const canZoomOut = zoom === 'auto' || zoomSteps.indexOf(zoom) > 0;

        return (
            <Panel
                className={cn(styles.container, className)}
                bodyClassName={styles.body}
                {...props}>
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
                            onClick={this.handleZoomOut}/>
                        <Button
                            style={{ minWidth: 80 }}
                            onClick={this.handleZoomReset}>
                            {zoom === 'auto' ? 'Auto' : `${zoom}%`}
                        </Button>
                        <Button
                            icon="plus"
                            disabled={!canZoomIn}
                            onClick={this.handleZoomIn}/>
                    </ButtonGroup>
                </div>
            </Panel>
        );
    }
});

export default enhance(Transport);
