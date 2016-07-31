import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    pure
);
