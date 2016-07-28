import { createSelector } from 'reselect';
import { connect } from 'react-redux';

const getExperiment = (state, props) => {
    const { id } = props;
    const { experimentsById } = state;
    return experimentsById[id];
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
