import { atom } from "recoil";

export const playingState = atom ({
    key: 'playingState',
    default: {
        trackId: null,
        playlistId: null,
        typePlaying: null,
        isPlaying: false,
        trackOrder: 0,
        tracks: [],
    },
})