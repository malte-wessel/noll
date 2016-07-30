import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import raf, { cancel as caf } from 'raf';
import RedBox from 'redbox-react';

import Scrollbars from 'components/ui/Scrollbars';
import styles from './styles.scss';
import enhance from './enhance';

const Player = createClass({

    displayName: 'Player',

    propTypes: {
        id: PropTypes.string.isRequired,
        playing: PropTypes.bool.isRequired,
        finished: PropTypes.bool.isRequired,
        repeat: PropTypes.bool.isRequired,
        step: PropTypes.number.isRequired,
        reset: PropTypes.number.isRequired,
        values: PropTypes.object.isRequired,
        stageWidth: PropTypes.number,
        stageHeight: PropTypes.number,
        fps: PropTypes.number.isRequired,
        zoom: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]).isRequired,
        initialize: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        className: PropTypes.string
    },

    getInitialState() {
        return {
            error: undefined,
        };
    },

    componentDidMount() {
        this.reset();
        this.setDimensions();
        window.addEventListener('resize', this.handleWindowResize);
    },

    componentWillReceiveProps(propsNext) {
        const { error } = this.state;
        const { initialize, update } = this.props;
        const { initialize: initializeNext, update: updateNext } = propsNext;
        const shouldResetError = !!error && (initializeNext !== initialize || updateNext !== update);
        if (shouldResetError) this.setState({ error: undefined });
    },

    componentDidUpdate(propsPrev) {
        const { id, playing, step, reset, initialize } = this.props;
        const {
            id: idPrev,
            playing: playingPrev,
            step: stepPrev,
            reset: resetPrev,
            initialize: initializePrev
        } = propsPrev;

        const shouldReset =
            id !== idPrev ||
            initialize !== initializePrev ||
            reset !== resetPrev;

        if (shouldReset) this.reset();

        if (playing !== playingPrev) {
            if (playing) this.play();
            else this.pause();
        }

        if (step !== stepPrev) this.step(false);
    },

    componentWillUnmount() {
        this.pause();
        window.removeEventListener('resize', this.handleWindowResize);
    },

    setDimensions() {
        const { actions } = this.props;
        const { setStageSize } = actions;
        const $player = findDOMNode(this);
        const { offsetWidth: width, offsetHeight: height } = $player;
        setStageSize({ width, height });
    },

    play() {
        const { finished } = this.props;
        if (finished) this.reset();
        this.loop();
    },

    pause() {
        clearTimeout(this.delayTimer);
        caf(this.rafTimer);
    },

    reset() {
        const { canvas } = this.refs;
        const { initialize, values } = this.props;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        try {
            this.data = initialize(canvas, values);
        } catch (error) {
            this.setState({ error });
        }
    },

    loop() {
        const { fps, playing } = this.props;
        if (!playing) return;
        if (fps && fps !== 60) {
            this.delayTimer = setTimeout(this.step, 1000 / fps);
        } else {
            this.step();
        }
    },

    step(loop = true) {
        const { canvas } = this.refs;
        const { repeat, update, actions, values } = this.props;
        const { finish, reset } = actions;
        this.rafTimer = raf(() => {
            let result;

            try {
                result = update(canvas, this.data, values);
            } catch (error) {
                result = false;
                this.setState({ error });
            }

            if (result === false) {
                if (repeat) reset();
                else return finish();
            }

            if (loop) this.loop();
        });
    },

    handleWindowResize() {
        this.setDimensions();
    },

    handleClickPlay() {
        const { actions } = this.props;
        const { play } = actions;
        play();
    },

    handleClickPause() {
        const { actions } = this.props;
        const { pause } = actions;
        pause();
    },

    handleClickReset() {
        const { actions } = this.props;
        const { reset } = actions;
        reset();
    },

    render() {
        /* eslint-disable no-unused-vars */
        const {
            id,
            playing,
            finished,
            repeat,
            step,
            reset,
            values,
            zoom,
            stageWidth,
            stageHeight,
            fps,
            initialize,
            update,
            config,
            actions,
            className,
            ...props
        } = this.props;
        /* eslint-enable*/

        const { error } = this.state;
        const {
            width = stageWidth || 0,
            height = stageHeight || 0
        } = config;

        let finalWidth = width;
        let finalHeight = height;

        if (zoom === 'auto') {
            finalWidth = stageHeight * (width / height);
            finalHeight = stageHeight;
            if (finalWidth > stageWidth) {
                finalWidth = stageWidth;
                finalHeight = stageWidth * (height / width);
            }
        } else {
            finalWidth = width * (zoom / 100);
            finalHeight = height * (zoom / 100);
        }

        const canvasStyle = !isNaN(finalWidth) && !isNaN(finalHeight)
            ? {
                position: 'relative',
                left: stageWidth > finalWidth ? (stageWidth - finalWidth) / 2 : 0,
                top: stageHeight > finalHeight ? (stageHeight - finalHeight) / 2 : 0,
                width: finalWidth,
                height: finalHeight
            } : {};

        return (
            <div
                className={cn(styles.container, className)}
                {...props}>
                <Scrollbars>
                    <canvas
                        className={styles.canvas}
                        ref="canvas"
                        width={width}
                        height={height}
                        style={canvasStyle}/>
                    {error &&
                        <RedBox
                            error={error}/>
                    }
                </Scrollbars>
            </div>
        );
    }
});

export default enhance(Player);
