import map from 'lodash/map';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import * as actions from 'actions';

const mapStateToProps = createSelector(
    (state, props) => props.id,
    state => state.experimentsById,
    state => state.showDrawer,
    (experimentId, experimentsById, showDrawer) => {
        const warnings = [];
        const experiment = experimentsById[experimentId];

        if (experiment) {
            const { initialize, update } = experiment;
            if (typeof initialize !== 'function') warnings.push('`initialize` was not found or is not a function');
            if (typeof update !== 'function') warnings.push('`update` was not found or is not a function');
        }

        return {
            warnings,
            experimentOptions: map(experimentsById, ({ config }, id) => ({
                value: id,
                label: config.title
            })),
            showDrawer
        };
    }
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    pure
);
