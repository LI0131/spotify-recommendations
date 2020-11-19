import { Bullseye, Button } from '@patternfly/react-core';
import { useWindowDimensions } from '../utils/windowHook';

const urlBase = 'https://accounts.spotify.com/authorize?response_type=token';
const clientId = 'client_id=71e1905d849e4a5ba826d60bc1b78015';
const scope = 'scope=user-top-read'
const redirectUri = (origin) => `redirect_uri=${origin}/redirect`

const Entry = () => {
    const windowDimensions = useWindowDimensions();
    const { origin } = window.location;

    return <Bullseye style={windowDimensions}>
        <Button onClick={() => (window.location = `${urlBase}&${clientId}&${scope}&${redirectUri(origin)}`)}>
            Get Music Recommendations
        </Button>
    </Bullseye>;
};

export default Entry;