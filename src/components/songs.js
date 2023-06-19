import { playlistState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil'
import Song from './song';
import { playingState } from '../atoms/playingAtom';
import { useEffect } from 'react';

function Songs() {
    const playlist = useRecoilValue(playlistState);

    return (
        <div className='text-white ps-4 pe-8 flex flex-col space-y-1'>
            {playlist?.tracks.items.map((track, i, arr) => {
                return (typeof track != 'undefined' && track && track.track !== null && track.track.id !== null) ? <Song key={track.track.id} track={track} order={i} playlistId={playlist.id} /> : null
            }
            )}
        </div>
    )
}

export default Songs