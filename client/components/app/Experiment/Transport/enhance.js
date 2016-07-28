import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { play, pause, step, reset, toggleRepeat, setZoom } from 'actions/experiments';

const mapStateToProps = createSelector(
    state => state.experiments.playing,
    state => state.experiments.repeat,
    state => state.experiments.zoom,
    (playing, repeat, zoom) => ({ playing, repeat, zoom })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    play, pause, step, reset, toggleRepeat, setZoom
}, dispatch);

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
