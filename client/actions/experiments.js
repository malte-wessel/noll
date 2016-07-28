export function set(experimentsById) {
    return {
        type: 'EXPERIMENTS_SET',
        payload: experimentsById
    };
}

export function play() {
    return {
        type: 'EXPERIMENTS_PLAY'
    };
}

export function pause() {
    return {
        type: 'EXPERIMENTS_PAUSE'
    };
}

export function step() {
    return {
        type: 'EXPERIMENTS_STEP'
    };
}

export function finish() {
    return {
        type: 'EXPERIMENTS_FINISH'
    };
}

export function reset() {
    return {
        type: 'EXPERIMENTS_RESET'
    };
}

export function toggleRepeat() {
    return {
        type: 'EXPERIMENTS_TOGGLE_REPEAT'
    };
}

export function setValue(key, value) {
    return {
        type: 'EXPERIMENTS_SET_VALUE',
        payload: { key, value }
    };
}

export function resetValues() {
    return {
        type: 'EXPERIMENTS_RESET_VALUES'
    };
}

export function setZoom(zoom) {
    return {
        type: 'EXPERIMENTS_SET_ZOOM',
        payload: zoom
    };
}
