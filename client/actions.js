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

export function zoomIn() {
    return {
        type: 'ZOOM_IN'
    };
}

export function zoomOut() {
    return {
        type: 'ZOOM_OUT'
    };
}

export function zoomReset() {
    return {
        type: 'ZOOM_RESET'
    };
}

export function setStageSize({ width, height }) {
    return {
        type: 'SET_STAGE_SIZE',
        payload: { width, height }
    };
}

export function setFps(fps) {
    return {
        type: 'SET_FPS',
        payload: parseInt(fps, 10)
    };
}
