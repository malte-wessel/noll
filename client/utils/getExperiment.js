export default function getExperiment(state, props) {
    const { id } = props;
    const { experiments } = state;
    const { byId } = experiments;
    return byId[id];
}
