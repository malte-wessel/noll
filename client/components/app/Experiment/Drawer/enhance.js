import { createSelector } from 'reselect';
import { connect } from 'react-redux';

const getExperiment = (state, props) => {
    const { id } = props;
    const { experiments } = state;
    const { byId } = experiments;
    return byId[id];
};

const mapStateToProps = createSelector(
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.config;
    },
    (config) => ({
        config
    })
);

export default function enhance(Component) {
    return connect(mapStateToProps)(Component);
}
