import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

const mapStateToProps = createSelector(
    (state, props) => {
        const { params } = props;
        const { id } = params;
        return id;
    },
    state => state.experimentsById,
    (id, experimentsById) => ({
        id, exists: !!experimentsById[id]
    })
);

export default compose(
    connect(mapStateToProps),
    pure
);
