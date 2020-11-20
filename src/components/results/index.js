import './index.scss';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from '@patternfly/react-core';
import TrackCard from './TrackCard';
import { RedoIcon } from '@patternfly/react-icons';
import { getSpotifyRedirectUrl } from '../../utils/Common';

const Results = ({ recommendations, setHeaderActions }) => {

    const [trackIds, setTrackIds] = useState();

    useEffect(() => {
        setHeaderActions([{
            title: RedoIcon,
            label: "Refresh",
            props: {
                style: { margin: '25px' },
                size: 'md',
                color: '#0066CC',
                onClick: () => (window.location = getSpotifyRedirectUrl(origin))
            }
        }]);
    }, []);

    useEffect(() => {
        setTrackIds(recommendations?.tracks?.map(track => track.id));
    }, [recommendations]);

    return <Flex direction={{ default: 'column' }} className='spot-c-results'>
        {trackIds && trackIds.map(id => <TrackCard trackId={id}/>)}
    </Flex>;
};

Results.propTypes = {
    recommendations: PropTypes.array,
    setHeaderActions: PropTypes.func
};

export default connect(state => ({
    recommendations: state.Reducer.recommendations
}), undefined)(Results);