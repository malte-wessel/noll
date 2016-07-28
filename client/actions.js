export function setExperiments(experimentsById) {
    return {
        type: 'SET_EXPERIMENTS',
        payload: experimentsById
    };
}

export function play() {
    return {
        type: 'PLAY'
    };
}

export function pause() {
    return {
        type: 'PAUSE'
    };
}

export function step() {
    return {
        type: 'STEP'
    };
}

export function finish() {
    return {
        type: 'FINISH'
    };
}

export function reset() {
    return {
        type: 'RESET'
    };
}

export function toggleRepeat() {
    return {
        type: 'TOGGLE_REPEAT'
    };
}

export function setValue(key, value) {
    return {
        type: 'SET_VALUE',
        payload: { key, value }
    };
}

export function resetValues() {
    return {
        type: 'RESET_VALUES'
    };
}

export function setZoom(zoom) {
    return {
        type: 'SET_ZOOM',
        payload: zoom
    };
}
