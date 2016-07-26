import { createSelector } from 'reselect';
import { connect } from 'react-redux';

const mapStateToProps = createSelector(
    (state, props) => {
        const { params } = props;
        const { id } = params;
        return id;
    },
    state => state.experiments.byId,
    (id, byId) => ({
        id, exists: !!byId[id]
    })
);

export default function enhance(Component) {
    return connect(mapStateToProps)(Component);
}
