import map from 'lodash/map';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

const mapStateToProps = createSelector(
    state => state.experimentsById,
    (experimentsById) => ({
        experimentOptions: map(experimentsById, (experiment, id) => ({
            value: id,
            label: experiment.config.title
        }))
    })
);

export default compose(
    withRouter,
    connect(mapStateToProps),
    pure
);
