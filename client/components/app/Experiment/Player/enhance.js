import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import * as actions from 'actions';
import getExperiment from 'utils/getExperiment';
import getValues from 'utils/getValues';

const mapStateToProps = createSelector(
    state => state.playing,
    state => state.finished,
    state => state.repeat,
    state => state.step,
    state => state.reset,
    state => state.values,
    state => state.zoom,
    state => state.stageWidth,
    state => state.stageHeight,
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.config;
    },
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.initialize;
    },
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.update;
    },
    (playing, finished, repeat, step, reset, values, zoom, stageWidth, stageHeight, config, initialize, update) => {
        const { controls } = config;
        return {
            playing,
            finished,
            repeat,
            step,
            reset,
            values: getValues(controls, values),
            zoom,
            stageWidth,
            stageHeight,
            config,
            initialize,
            update
        };
    }
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
