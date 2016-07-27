import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import raf, { cancel as caf } from 'raf';
import RedBox from 'redbox-react';

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
        initialize: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        className: PropTypes.string
    },

    getInitialState() {
        return {
            error: undefined
        };
    },

    componentDidMount() {
        this.reset();
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
            reset,
            values,
            initialize,
            update,
            config,
            actions,
            className,
            ...props
        } = this.props;
        /* eslint-enable*/

        const { width, height } = config;
        const { error } = this.state;

        return (
            <div className={cn(styles.container, className)} {...props}>
                <canvas
                    className={styles.canvas}
                    ref="canvas"
                    width={width}
                    height={height}/>
                {error &&
                    <RedBox
                        error={error}/>
                }
            </div>
        );
    }
});

export default enhance(Player);
