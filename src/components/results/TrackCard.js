import './TrackCard.scss';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as Actions from '../../actions';
import { FlexItem, TextContent, Text } from '@patternfly/react-core';
import { PauseIcon, PlayIcon, SpotifyIcon } from '@patternfly/react-icons';

const BASE_URL = 'https://api.spotify.com/v1/tracks';

const TrackCard = ({ trackId, accessToken, playingTrack, setPlayingTrack }) => {

    const [trackData, setTrackData] = useState();
    const [playerState, setPlayerState] = useState(false);

    const parseTrackData = (data) => ({
        name: data?.name,
        artists: data?.artists.map(artist => artist.name),
        preview_url: data?.preview_url,
        link: data?.external_urls?.spotify,
        album: {
            name: data?.album?.name,
            image: data?.album?.images.filter(image => image.height === 640)?.[0]?.url,
            release_date: data?.album?.release_date
        }
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/${trackId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(response => parseTrackData(response.data)).then(data => setTrackData(data));
    }, [trackId, setTrackData]);

    useEffect(() => {
        if (trackId !== playingTrack && playerState) {
            document.getElementById(trackId)?.pause();
            setPlayerState(false);
        }
    }, [trackId, playingTrack, playerState, setPlayerState]);

    return <FlexItem key={trackId} className='spot-c-track_card'>
        {trackData && <React.Fragment>
            <div className='spot-c-track_card--info'>
                <div className='spot-c-track_card--image'>
                    <img src={trackData.album.image}/>
                </div>
                <div className='spot-c-track_card--textblock'>
                    <TextContent>
                        <Text className='spot-c-track_card--track'>
                            {trackData?.name.length > 40 ?
                                `${trackData?.name.substring(0, 40)}...` :
                                trackData?.name}
                        </Text>
                    </TextContent>
                    <TextContent>
                        <Text className='spot-c-track_card--track'>
                            {trackData?.artists.join(', ').length > 40 ?
                                `${trackData?.artists.join(', ').substring(0, 40)}...` :
                                trackData?.artists.join(', ')}
                        </Text>
                    </TextContent>
                </div>
            </div>
            <div className='spot-c-track_card--buttons'>
                {trackId == playingTrack ?
                    <PauseIcon onClick={() => {
                        document.getElementById(trackId)?.pause();
                        setPlayingTrack(null);
                        setPlayerState(false);
                    }} className='spot-c-track_card--play-pause-button'/> :
                    <PlayIcon onClick={() => {
                        document.getElementById(trackId)?.play();
                        setPlayingTrack(trackId);
                        setPlayerState(true);
                    }} className='spot-c-track_card--play-pause-button'/>}
                <audio id={trackId}>
                    <source src={trackData.preview_url}/>
                </audio>
                <a href={trackData?.link}>
                    <SpotifyIcon className='spot-c-track_card--spot-button'/>
                </a>
            </div>
        </React.Fragment>}
    </FlexItem>;
};

TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired,
    accessToken: PropTypes.string,
    playingTrack: PropTypes.string
};

export default connect(state => ({
    accessToken: state.Reducer.accessToken,
    playingTrack: state.Reducer.playingTrack
}), dispatch => ({
    setPlayingTrack: (trackId) => dispatch(Actions.setPlayingTrack(trackId))
}))(TrackCard);
