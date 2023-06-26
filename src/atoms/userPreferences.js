import { atom } from "recoil";

export const preferencesState = atom   ( {
    key: 'preferencesState',
    default: {
        theme: 'dark',
        homeColor: '#406cbf',
        sidebarColor: '#406cbf',
        home: 'accent',
        sidebar: 'neutral'
    }
})
