import { likedSongsState, playlistState } from '../../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil'
import Song from './song';
import { playingState } from '../../atoms/playingAtom';
import { useEffect } from 'react';
import { currentViewState } from '../../atoms/viewAtom';

function Songs() {
    const playlist = useRecoilValue(playlistState);
    const view = useRecoilValue(currentViewState);
    const likedSongs = useRecoilValue(likedSongsState);
    return (
        <>
            {view !== "likedsongs" ?
                <div className='text-white ps-4 pe-8 flex flex-col space-y-1'>
                    {playlist?.tracks?.items?.map((track, i, arr) => {
                        return (typeof track != 'undefined' && track && track.track !== null && track.track.id !== null) ? <Song key={i} track={track} order={i} playlistId={playlist.id} /> : null
                    }
                    )}
                </div> : 
                <div className='text-white ps-4 pe-8 flex flex-col space-y-1'>
                    {likedSongs?.items?.map((track, i, arr) => {
                        return (typeof track != 'undefined' && track && track.track !== null && track.track.id !== null) ? <Song key={i} track={track} order={i} playlistId={"liked"} /> : null
                    }
                    )}
                </div>}
        </>


    )
}

export default Songs