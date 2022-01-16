import * as TYPES from '../types';

const initialState = {
    accessToken: null,
    artists: null,
    tracks: null,
    recommendations: null,
    error: null,
    loading: false,
    playingTrack: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PENDING':
            return {
                ...state,
                loading: true
            };
        case `${TYPES.SET_ACCESS_TOKEN}`:
            return {
                ...state,
                accessToken: action.payload
            };
        case `${TYPES.GET_TOP_ARTISTS}_FULFILLED`:
            return {
                ...state,
                artists: action.payload
            };
        case `${TYPES.GET_TOP_TRACKS}_FULFILLED`:
            return {
                ...state,
                tracks: action.payload
            };
        case `${TYPES.GET_RECOMMENDATIONS}_FULFILLED`:
            return {
                ...state,
                recommendations: action.payload,
                loading: false
            };
        case 'REJECTED':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case TYPES.PLAYING_TRACK:
            return {
                ...state,
                playingTrack: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
