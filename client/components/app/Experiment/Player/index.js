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
        zoom: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
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
            offsetWidth: undefined,
            offsetHeight: undefined
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
        const $player = findDOMNode(this);
        const { offsetWidth, offsetHeight } = $player;
        this.setState({ offsetWidth, offsetHeight });
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
        const { config, playing } = this.props;
        const { delay } = config;
        if (!playing) return;
        if (delay) this.delayTimer = setTimeout(this.step, delay);
        else this.step();
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
            initialize,
            update,
            config,
            actions,
            className,
            ...props
        } = this.props;
        /* eslint-enable*/

        const { error, offsetWidth, offsetHeight } = this.state;
        const {
            width = offsetWidth,
            height = offsetHeight
        } = config;

        let finalWidth = width;
        let finalHeight = height;

        if (zoom === 'auto') {
            finalWidth = offsetHeight * (width / height);
            finalHeight = offsetHeight;
            if (finalWidth > offsetWidth) {
                finalWidth = offsetWidth;
                finalHeight = offsetWidth * (height / width);
            }
        } else {
            finalWidth = width * (zoom / 100);
            finalHeight = height * (zoom / 100);
        }

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
                        style={{
                            position: 'relative',
                            left: offsetWidth > finalWidth ? (offsetWidth - finalWidth) / 2 : 0,
                            top: offsetHeight > finalHeight ? (offsetHeight - finalHeight) / 2 : 0,
                            width: finalWidth,
                            height: finalHeight
                        }}/>
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
