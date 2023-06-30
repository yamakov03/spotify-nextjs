import { atom } from "recoil";

export const playingState = atom ({
    key: 'playingState',
    default: {
        trackId: null,
        artistId: null,
        playlistId: null,
        albumId: null,
        typePlaying: null,
        isPlaying: false,
        trackOrder: 0
    },
})