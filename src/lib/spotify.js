import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-top-read",
    "streaming",
    "user-read-playback-position",
    "user-read-recently-played",
    "user-library-read",
    "user-follow-read",
    "playlist-read-private",
    "playlist-read-collaborative"
].join(',');

const params = {
    scope: scopes,
}

const queryString = new URLSearchParams(params).toString();
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryString}`
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export {LOGIN_URL};