import { Bullseye, Button } from '@patternfly/react-core';
import { useWindowDimensions } from '../utils/windowHook';
import { useHistory } from 'react-router-dom';

const urlBase = 'https://accounts.spotify.com/authorize?response_type=token';
const clientId = 'client_id=71e1905d849e4a5ba826d60bc1b78015';
const scope = 'scope=user-top-read'
const redirectUri = 'redirect_uri=http://localhost:3000/redirect'

const Entry = () => {
    const windowDimensions = useWindowDimensions();

    return <Bullseye style={windowDimensions}>
        <Button onClick={() => (window.location = `${urlBase}&${clientId}&${scope}&${redirectUri}`)}>
            Get Music Recommendations
        </Button>
    </Bullseye>;
};

export default Entry;