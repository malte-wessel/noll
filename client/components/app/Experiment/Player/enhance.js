import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import * as actions from 'actions/experiments';
import getExperiment from 'utils/getExperiment';
import getValues from 'utils/getValues';

const mapStateToProps = createSelector(
    state => state.experiments.playing,
    state => state.experiments.finished,
    state => state.experiments.repeat,
    state => state.experiments.step,
    state => state.experiments.reset,
    state => state.experiments.values,
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
    (playing, finished, repeat, step, reset, values, config, initialize, update) => {
        const { controls } = config;
        return {
            playing,
            finished,
            repeat,
            step,
            reset,
            values: getValues(controls, values),
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
