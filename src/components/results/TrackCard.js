import './TrackCard.scss';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FlexItem, Grid, GridItem, TextContent, Text, Card } from '@patternfly/react-core';
import { PauseIcon, PlayIcon, SpotifyIcon } from '@patternfly/react-icons';

const BASE_URL = 'https://api.spotify.com/v1/tracks'

const TrackCard = ({ trackId, accessToken }) => {
    const [trackData, setTrackData] = useState();
    const [isPreviewing, setPreviewStatus] = useState(false);

    const parseTrackData = (data) => ({
        name: data?.name,
        artists: data?.artists.map(artist => artist.name),
        preview_url: data?.preview_url,
        link: data?.external_urls?.spotify,
        album: {
            name: data?.album?.name,
            image: data?.album?.images.filter(image => image.height === 64)?.[0]?.url,
            release_date: data?.album?.release_date
        }
    });

    const togglePreview = () => {
        const preview = document.getElementById(trackId);
        isPreviewing ? preview.pause() : preview.play();
        setPreviewStatus(!isPreviewing);
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/${trackId}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(response => parseTrackData(response.data)).then(data => setTrackData(data));
    }, [trackId, setTrackData]);

    return <FlexItem className='spot-c-track_flex'>
        {trackData && <Card className='spot-c-track_card'>
            <Grid>
                <GridItem span={2} rowSpan={1} className='spot-c-track_card--image'>
                    <img src={trackData.album.image}/>
                </GridItem>
                <GridItem span={8} rowSpan={1} className='spot-c-track_card--textblock'>
                    <TextContent>
                        <Text component='small' className='spot-c-track_card--track'>
                            {trackData?.name.length > 30 ?
                                `${trackData?.name.substring(0, 30)}...` :
                                trackData?.name}
                        </Text>
                    </TextContent>
                    <TextContent>
                        <Text component='small' className='spot-c-track_card--track'>
                            {trackData?.artists.join(', ').length > 30 ?
                                `${trackData?.artists.join(', ').substring(0, 30)}...` :
                                trackData?.artists.join(', ')}
                        </Text>
                    </TextContent>
                </GridItem>
                <GridItem span={2} rowSpan={1} className='spot-c-track_card--buttons'>
                        {isPreviewing ? 
                            <PauseIcon onClick={togglePreview} color='white' className='spot-c-track_card--play-pause-button'/> :
                            <PlayIcon onClick={togglePreview} color='white' className='spot-c-track_card--play-pause-button'/>}
                        <audio id={trackId}>
                            <source src={trackData.preview_url}/>
                        </audio>
                        <a href={trackData?.link}>
                            <SpotifyIcon size='md' className='spot-c-track_card--spot-button'/>
                        </a>
                </GridItem>
            </Grid>
        </Card>}
    </FlexItem>;

};

TrackCard.propTypes = {
    trackId: PropTypes.string.isRequired,
    accessToken: PropTypes.object
};

export default connect(state => ({
    accessToken: state.Reducer.accessToken
}), undefined)(TrackCard);