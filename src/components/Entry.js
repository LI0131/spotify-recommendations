import React from 'react';
import { Bullseye, Button, TextContent, Text } from '@patternfly/react-core';
import { useWindowDimensions } from '../utils/windowHook';
import { getSpotifyRedirectUrl } from '../utils/Common';

const Entry = () => {
    const windowDimensions = useWindowDimensions();
    const { origin } = window.location;

    return <React.Fragment>
        <div style={{ height: '60px', display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
            <TextContent style={{ margin: '10px', marginTop: '15px' }}>
                <Text component='h1'> Spotify Suggests </Text>
            </TextContent>
        </div>
        <Bullseye style={windowDimensions}>
            <Button onClick={() => (window.location = getSpotifyRedirectUrl(origin))}>
                Get Music Recommendations
            </Button>
        </Bullseye>
    </React.Fragment>;
};

export default Entry;