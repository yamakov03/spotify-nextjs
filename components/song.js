import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify';
import { millisecondsToMinutesAndSeconds } from '@/lib/time'
import React from 'react'
import { useRecoilState } from 'recoil'

function Song({ order, track }) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = async () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        });
    };
    return (
        <div className='grid grid-cols-2 text-neutral-400 py-4 px-5 hover:bg-neutral-900 
    rounded-lg cursor-pointer' onClick={playSong}>
            <div className='flex items-center space-x-4 '>
                <p className="text-end w-[20px] me-2">{order + 1}</p>
                <img
                    className='h-10 w-10'
                    src={track.track.album.images[0].url}
                    alt="" />
                <div>
                    <p className='w-36 lg:w-64 pe-5 text-white truncate'>{track.track.name}</p>
                    <div className='flex'>
                        {track.track.explicit && (
                            <p className='text-xs bg-neutral-400 p-[8px] me-2 rounded-sm text-black leading-[7px]'>E</p>
                        )}
                         <p className='w-40 truncate'>{track.track.artists[0].name}</p>
                    </div>    
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-40 hidden md:inline truncate'>{track.track.album.name}</p>
                
                <p>{millisecondsToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song