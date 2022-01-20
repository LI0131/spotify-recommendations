import * as TYPES from './types';
import axios from 'axios';
import { parse_results } from './utils/Common'


const execute_thunk = (url, type, token, postprocess = ((props) => props)) => dispatch => {
    dispatch({ type: 'PENDING' });
    axios.get(url, {
        headers: {'Authorization': `Bearer ${token}`}
    }).then((response) => postprocess(response.data)).then(data => {
        dispatch({ type: `${type}_FULFILLED`, payload: data });
    }).catch((error) => {
        if (!axios.isCancel(error)) {
            dispatch({ type: 'REJECTED', payload: error });
        }
    });
};

export const setAccessToken = (token) => ({
    type: TYPES.SET_ACCESS_TOKEN,
    payload: token
});

export const getTopArtists = (url, token) => execute_thunk(url, TYPES.GET_TOP_ARTISTS, token, parse_results);

export const getTopTracks = (url, token) => execute_thunk(url, TYPES.GET_TOP_TRACKS, token, parse_results);

export const getRecommendations = (url, token) => execute_thunk(url, TYPES.GET_RECOMMENDATIONS, token);

export const setPlayingTrack = (trackId) => ({
    type: TYPES.PLAYING_TRACK,
    payload: trackId
});

export const setInstrumentalness = (value) => ({
    type: TYPES.INSTRUMENTALNESS,
    payload: value
});

export const setEnergy = (value) => ({
    type: TYPES.ENERGY,
    payload: value
});

export const setPopularity = (value) => ({
    type: TYPES.POPULARITY,
    payload: value
});

export const setLoudness = (value) => ({
    type: TYPES.LOUDNESS,
    payload: value
});
