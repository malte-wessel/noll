import map from 'lodash/map';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

const mapStateToProps = createSelector(
    (state, props) => props.id,
    state => state.experimentsById,
    (experimentId, experimentsById) => {
        const { initialize, update } = experimentsById[experimentId];
        const warnings = [];
        if (typeof initialize !== 'function') {
            warnings.push('`initialize` was not found or is not a function');
        }
        if (typeof update !== 'function') {
            warnings.push('`update` was not found or is not a function');
        }
        return {
            warnings,
            experimentOptions: map(experimentsById, (experiment, id) => ({
                value: id,
                label: experiment.config.title
            }))
        };
    }
);

export default compose(
    withRouter,
    connect(mapStateToProps),
    pure
);
