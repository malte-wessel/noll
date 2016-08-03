export default function getExperiment(state, props) {
    const { id } = props;
    const { experimentsById } = state;
    return experimentsById[id];
}
