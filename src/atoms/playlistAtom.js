import { atom } from "recoil";

export const playlistState = atom ({
    key: 'playlistState',
    default: null,
})

export const playlistIdState = atom ({
    key: 'playlistIdState',
    default: null,
})

export const likedSongsState = atom ({
    key: 'likedSongsState',
    default: null,
})