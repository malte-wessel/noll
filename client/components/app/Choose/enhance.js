import { createSelector } from 'reselect';
import { connect } from 'react-redux';

const mapStateToProps = createSelector(
    state => state.experiments.byId,
    (experimentsById) => ({ experimentsById })
);

export default function enhance(Component) {
    return connect(mapStateToProps)(Component);
}
