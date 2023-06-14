import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify';
import { millisecondsToMinutesAndSeconds } from '@/lib/time'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import AnimatedBars from './animatedBars';
import { PlayIcon } from '@heroicons/react/solid';
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5';
import { display } from '@microsoft/fast-foundation';

function Song({ order, track }) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [isHovering, setIsHovering] = useState(false);

    const playSong = async () => {

        setIsPlaying(true);
        // spotifyApi.play({
        //     uris: [track.track.uri],
        // });
    };

    const handlePlayPause = () => {
        if (isPlaying && track.track.id === currentTrackId) {
            setIsPlaying(false);
        } else {
            setCurrentTrackId(track.track.id);
            setIsPlaying(true);
        }
    }

    const toggleHover = () => {
        setIsHovering(!isHovering);
    }

    return (
        <div className={`grid grid-cols-2 text-neutral-400 py-2 my-2 px-5 hover:bg-neutral-600 song
        rounded-lg cursor-pointer `} onClick={() => handlePlayPause()} >
            <div className='flex items-center '>
                <div className={`text-end w-[20px] flex-shrink-0 me-6 hover-hidden ${track.track.id === currentTrackId ? 'text-[--text-bright-accent]' : null}`} >
                    {track.track.id === currentTrackId && isPlaying ? <AnimatedBars /> : order + 1}
                    </div>

                <div className="text-end w-[20px] me-[24px] hover-show" >
                {isPlaying && track.track.id === currentTrackId ?
                        <IoPauseSharp style={{ fontSize: "20px", width: "20px", position: "relative", left: "5px"}} /> :
                        <IoPlaySharp style={{ fontSize: "20px", width: "20px", position: "relative", left: "5px"}} />} 
                    </div>

                <img
                    className='h-10 w-10 me-6'
                    src={track.track.album.images[0].url}
                    alt="" />
                <div>
                    <p className={`w-40 lg:w-64 pe-5 truncate ${track.track.id === currentTrackId ? 'text-[--text-bright-accent]' : 'text-white'}`}>{track.track.name}</p>

                    <div className='flex'>
                        {track.track.explicit && (
                            <div className='text-[1rem] box-border font-semibold bg-neutral-400 me-2 rounded-sm h-[17px] mt-[3px]'>
                                <span className='text-[11px] inline-flex align-middle justify-center text-black pl-[5px] pe-[5px] h-[8px] leading-[8px] mb-2'>E</span>
                            </div>
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