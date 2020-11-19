export const parse_results = (obj) => obj.items.map(item => item.id);

export const getSpotifyRedirectUrl = (origin) => {
    const urlBase = 'https://accounts.spotify.com/authorize?response_type=token';
    const clientId = 'client_id=71e1905d849e4a5ba826d60bc1b78015';
    const scope = 'scope=user-top-read';
    const redirectUri = `redirect_uri=${origin}/redirect`;
    return `${urlBase}&${clientId}&${scope}&${redirectUri}`;
}