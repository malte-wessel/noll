import map from 'lodash/map';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = createSelector(
    state => state.experimentsById,
    (experimentsById) => ({
        experimentOptions: map(experimentsById, (experiment, id) => ({
            value: id,
            label: experiment.config.title
        }))
    })
);

export default function enhance(Component) {
    return withRouter(connect(mapStateToProps)(Component));
}
