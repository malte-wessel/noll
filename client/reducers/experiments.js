const initialState = {
    byId: {},
    playing: false,
    finished: true,
    repeat: false,
    step: 0,
    reset: 0,
    values: {},
    zoom: 'auto'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'EXPERIMENTS_SET': {
            return {
                ...state,
                byId: action.payload
            };
        }
        case 'EXPERIMENTS_PLAY': {
            return {
                ...state,
                playing: true
            };
        }
        case 'EXPERIMENTS_PAUSE': {
            return {
                ...state,
                playing: false,
                finished: false
            };
        }
        case 'EXPERIMENTS_STEP': {
            return {
                ...state,
                step: state.step + 1
            };
        }
        case 'EXPERIMENTS_FINISH': {
            return {
                ...state,
                playing: false,
                finished: true
            };
        }
        case 'EXPERIMENTS_RESET': {
            return {
                ...state,
                reset: state.reset + 1,
                finished: false
            };
        }
        case 'EXPERIMENTS_TOGGLE_REPEAT': {
            return {
                ...state,
                repeat: !state.repeat
            };
        }
        case 'EXPERIMENTS_SET_VALUE': {
            const { key, value } = action.payload;
            return {
                ...state,
                values: {
                    ...state.values,
                    [key]: value
                }
            };
        }
        case 'EXPERIMENTS_RESET_VALUES': {
            return {
                ...state,
                values: {}
            };
        }
        case 'EXPERIMENTS_SET_ZOOM': {
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
