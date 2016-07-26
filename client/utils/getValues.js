import reduce from 'lodash/reduce';

export default function getValues(controls = [], values = {}) {
    return reduce(controls, (acc, control) => {
        const { key, value } = control;
        acc[key] = values[key] !== undefined ? values[key] : value;
        return acc;
    }, {});
}
