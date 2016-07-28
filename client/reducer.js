const initialState = {
    experimentsById: {},
    playing: false,
    finished: true,
    repeat: false,
    step: 0,
    reset: 0,
    values: {},
    zoom: 'auto',
    playerWidth: undefined,
    playerHeight: undefined
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_EXPERIMENTS': {
            return {
                ...state,
                experimentsById: action.payload
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
        case 'SET_ZOOM': {
            return {
                ...state,
                zoom: action.payload
            };
        }
        default: {
            return state;
        }
    }
}
