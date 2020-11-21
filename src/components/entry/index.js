import './index.scss';

import React from 'react';
import { Bullseye, Button } from '@patternfly/react-core';
import { getSpotifyRedirectUrl } from '../../utils/Common';
import PropTypes from 'prop-types';

const Entry = () => {
    const { origin } = window.location;

    return <Bullseye>
        <Button
            className='spot-c-entry__rec-button'
            onClick={() => (window.location = getSpotifyRedirectUrl(origin))}
        >
            Get Music Recommendations
        </Button>
    </Bullseye>;
};

Entry.propTypes = {
    setHeaderActions: PropTypes.func
}

export default Entry;