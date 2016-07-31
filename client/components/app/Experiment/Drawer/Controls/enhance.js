import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import * as actions from 'actions';
import getExperiment from 'utils/getExperiment';
import getValues from 'utils/getValues';

const mapStateToProps = createSelector(
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.config && experiment.config.controls;
    },
    state => state.values,
    (controls, values) => ({
        controls: controls || [],
        values: getValues(controls, values)
    })
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    pure
);
