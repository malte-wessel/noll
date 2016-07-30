import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { play, pause, step, reset, toggleRepeat, zoomIn, zoomOut, zoomReset, setFps } from 'actions';

const mapStateToProps = createSelector(
    state => state.playing,
    state => state.repeat,
    state => state.zoom,
    state => state.canZoomIn,
    state => state.canZoomOut,
    state => state.fps,
    (playing, repeat, zoom, canZoomIn, canZoomOut, fps) => ({
        playing, repeat, zoom, canZoomIn, canZoomOut, fps
    })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    play, pause, step, reset, toggleRepeat,
    zoomIn, zoomOut, zoomReset, setFps
}, dispatch);

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
