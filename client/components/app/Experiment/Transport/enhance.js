import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { play, pause, step, reset, toggleRepeat, zoomIn, zoomOut, zoomReset } from 'actions';

const mapStateToProps = createSelector(
    state => state.playing,
    state => state.repeat,
    state => state.zoom,
    state => state.canZoomIn,
    state => state.canZoomOut,
    (playing, repeat, zoom, canZoomIn, canZoomOut) => ({
        playing, repeat, zoom, canZoomIn, canZoomOut
    })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    play, pause, step, reset, toggleRepeat,
    zoomIn, zoomOut, zoomReset
}, dispatch);

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
