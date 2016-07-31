import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

const mapStateToProps = createSelector(
    state => state.experimentsById,
    (experimentsById) => ({ experimentsById })
);


export default compose(
    connect(mapStateToProps),
    pure
);
