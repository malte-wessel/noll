import zoomSteps from 'utils/zoomSteps';

const initialState = {
    experimentsById: {},
    playing: false,
    finished: true,
    repeat: false,
    step: 0,
    reset: 0,
    values: {},
    zoom: 'auto',
    canZoomIn: true,
    canZoomOut: true,
    stageWidth: undefined,
    stageHeight: undefined,
    fps: 60,
    showDrawer: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_EXPERIMENTS': {
            return {
                ...state,
                experimentsById: action.payload
            };
        }
        case 'CLEAR_EXPERIMENT': {
            return {
                ...state,
                playing: initialState.playing,
                finished: initialState.finished,
                values: {},
                zoom: initialState.zoom,
                canZoomIn: initialState.canZoomIn,
                canZoomOut: initialState.canZoomOut,
                fps: initialState.fps
            };
        }
        case 'PLAY': {
            return {
                ...state,
                playing: true
            };
        }
        case 'PAUSE': {
            return {
                ...state,
                playing: false,
                finished: false
            };
        }
        case 'STEP': {
            return {
                ...state,
                step: state.step + 1
            };
        }
        case 'FINISH': {
            return {
                ...state,
                playing: false,
                finished: true
            };
        }
        case 'RESET': {
            return {
                ...state,
                reset: state.reset + 1,
                finished: false
            };
        }
        case 'TOGGLE_REPEAT': {
            return {
                ...state,
                repeat: !state.repeat
            };
        }
        case 'SET_VALUE': {
            const { key, value } = action.payload;
            return {
                ...state,
                values: {
                    ...state.values,
                    [key]: value
                }
            };
        }
        case 'RESET_VALUES': {
            return {
                ...state,
                values: {}
            };
        }
        case 'ZOOM_IN': {
            const idx = zoomSteps.indexOf(state.zoom);
            const zoom = state.zoom === 'auto' ? 100 : zoomSteps[idx + 1];
            const canZoomIn = zoomSteps.indexOf(zoom) < zoomSteps.length - 1;
            const canZoomOut = true;
            return {
                ...state,
                zoom,
                canZoomIn,
                canZoomOut
            };
        }
        case 'ZOOM_OUT': {
            const idx = zoomSteps.indexOf(state.zoom);
            const zoom = state.zoom === 'auto' ? 100 : zoomSteps[idx - 1];
            const canZoomIn = true;
            const canZoomOut = zoomSteps.indexOf(zoom) > 0;
            return {
                ...state,
                zoom,
                canZoomIn,
                canZoomOut
            };
        }
        case 'ZOOM_RESET': {
            return {
                ...state,
                zoom: state.zoom === 'auto' ? 100 : 'auto',
                canZoomIn: true,
                canZoomOut: true
            };
        }
        case 'SET_STAGE_SIZE': {
            return {
                ...state,
                stageWidth: action.payload.width,
                stageHeight: action.payload.height
            };
        }
        case 'SET_FPS': {
            return {
                ...state,
                fps: action.payload
            };
        }
        case 'TOGGLE_DRAWER': {
            return {
                ...state,
                showDrawer: !state.showDrawer
            };
        }
        default: {
            return state;
        }
    }
}
