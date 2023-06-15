import { atom } from "recoil";

export const playingState = atom ({
    key: 'playingState',
    default: {
        id: null,
        type: null,
        isPlaying: false,
    },
})