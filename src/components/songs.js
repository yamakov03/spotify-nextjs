import { playlistState } from '@/src/atoms/playlistAtom';
import { useRecoilValue } from 'recoil'
import Song from './song';

function Songs() {
    const playlist = useRecoilValue(playlistState);
    return (
        <div className='text-white px-8 flex flex-col space-y-1'>
            {playlist?.tracks.items.map((track, i) => {
                return (typeof track != 'undefined' && track && track.track !== null && track.track.id !== null ) ? <Song key={track.track.id} track={track} order={i} /> : null
            }
                
            )}
        </div>
    )
}

export default Songs