import * as Types from '../types';

var initialState = sessionStorage.getItem(Types.STATE) ?
    JSON.parse(sessionStorage.getItem(Types.STATE)) :
    {
        accessToken: null,
        artists: null,
        tracks: null,
        recommendations: null,
        instrumentalness: 0,
        energy: 0,
        popularity: 0,
        loudness: 0,
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
        case `${Types.SET_ACCESS_TOKEN}`:
            return {
                ...state,
                accessToken: action.payload
            };
        case `${Types.GET_TOP_ARTISTS}_FULFILLED`:
            return {
                ...state,
                artists: action.payload
            };
        case `${Types.GET_TOP_TRACKS}_FULFILLED`:
            return {
                ...state,
                tracks: action.payload
            };
        case `${Types.GET_RECOMMENDATIONS}_FULFILLED`:
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
        case Types.PLAYING_TRACK:
            return {
                ...state,
                playingTrack: action.payload
            }
        case Types.INSTRUMENTALNESS:
            return {
                ...state,
                instrumentalness: action.payload
            }
        case Types.ENERGY:
            return {
                ...state,
                energy: action.payload
            }
        case Types.LOUDNESS:
            return {
                ...state,
                loudness: action.payload
            }
        case Types.POPULARITY:
            return {
                ...state,
                popularity: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
