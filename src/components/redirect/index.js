import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { TimesIcon } from '@patternfly/react-icons';
import * as Actions from '../../actions';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const BASE_URL = 'https://api.spotify.com/v1/me/top';
const RECOMMENDATIONS_BASE_URL = 'https://api.spotify.com/v1/recommendations';

const Redirect = ({
    accessToken, error, loading, artists, tracks, setAccessToken,
    getTopArtists, getTopTracks, getRecommendations, instrumentalness,
    loudness, energy, popularity
}) => {
    const history = useHistory();

    useEffect(() => {
        let hash = history.location.hash;
        hash = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&token_type'));
        setAccessToken(hash);
    }, []);

    useEffect(() => {
        if (accessToken) {
            getTopTracks(`${BASE_URL}/tracks?limit=3&time_range=short_term`, accessToken);
            getTopArtists(`${BASE_URL}/artists?limit=2&time_range=short_term`, accessToken);
        }
    }, [accessToken, getTopArtists, getTopTracks]);

    useEffect(() => {
        if (artists && tracks) {
            var recUrl = `${RECOMMENDATIONS_BASE_URL}?seed_artists=${artists}&seed_tracks=${tracks}`;
            recUrl += `&target_instrumentalness=${Math.round(instrumentalness/10) / 10}`;
            recUrl += `&target_energy=${Math.round(energy/10) / 10}`;
            recUrl += `&target_loudness=${Math.round(loudness/10) / 10}`;
            recUrl += `&target_popularity=${Math.round(popularity)}`;
            getRecommendations(recUrl, accessToken);
            history.push({
                pathname: 'results',
                hash: ''
            });
        }
    }, [artists, tracks, accessToken, getRecommendations]);

    return <React.Fragment>
        {loading && <Bullseye>
            <Spinner/>
        </Bullseye>}
        {error && <Bullseye>
            <TimesIcon color='red' size='xl'/>
        </Bullseye>}
    </React.Fragment>;
};

Redirect.propTypes = {
    accessToken: PropTypes.string,
    error: PropTypes.object,
    loading: PropTypes.bool,
    artists: PropTypes.array,
    tracks: PropTypes.array,
    getTopTracks: PropTypes.func,
    getTopArtists: PropTypes.func,
    setAccessToken: PropTypes.func,
    getRecommendations: PropTypes.func,
    instrumentalness: PropTypes.number,
    energy: PropTypes.number,
    popularity: PropTypes.number,
    loudness: PropTypes.number
};

export default connect(state => ({
    accessToken: state.Reducer.accessToken,
    error: state.Reducer.error,
    loading: state.Reducer.loading,
    artists: state.Reducer.artists,
    tracks: state.Reducer.tracks,
    instrumentalness: state.Reducer.instrumentalness,
    energy: state.Reducer.energy,
    popularity: state.Reducer.popularity,
    loudness: state.Reducer.loudness
}), dispatch => ({
    getTopArtists: (url, token) => dispatch(Actions.getTopArtists(url, token)),
    getTopTracks: (url, token) => dispatch(Actions.getTopTracks(url, token)),
    setAccessToken: (token) => dispatch(Actions.setAccessToken(token)),
    getRecommendations: (url, token) => dispatch(Actions.getRecommendations(url, token))
}))(Redirect);
