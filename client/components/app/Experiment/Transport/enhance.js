import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { play, pause, step, reset, toggleRepeat } from 'actions/experiments';

const mapStateToProps = createSelector(
    state => state.experiments.playing,
    state => state.experiments.repeat,
    (playing, repeat) => ({ playing, repeat })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    play, pause, step, reset, toggleRepeat
}, dispatch);

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
