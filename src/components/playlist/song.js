import useSpotify from '../../hooks/useSpotify';
import { millisecondsToMinutesAndSeconds, toDateFormat } from '../../lib/time'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import AnimatedBars from './animatedBars';
import { PlayIcon } from '@heroicons/react/solid';
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5';
import { playingState } from '../../atoms/playingAtom';

function Song({ order, track, playlistId }) {
    const [playing, setPlaying] = useRecoilState(playingState);

    const handlePlayPause = () => {
        if(track.track.type === "episode"){
            if (playing.trackId !== track.track.id) {
                setPlaying({ ...playing, typePlaying:"episode", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: true })
            } else if (playing.isPlaying) {
                setPlaying({ ...playing, typePlaying:"episode", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: false })
            }
            else {
                setPlaying({ ...playing, typePlaying:"episode", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: true })
            }
        } else {
            if (playing.trackId !== track.track.id) {
                setPlaying({ ...playing, typePlaying:"track", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: true })
            } else if (playing.isPlaying) {
                setPlaying({ ...playing, typePlaying:"track", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: false })
            }
            else {
                setPlaying({ ...playing, typePlaying:"track", trackOrder: order, playlistId: playlistId, trackId: track.track.id, isPlaying: true })
            }
        }
        
    }


    return (
        <div className={`@container grid-container grid grid-cols-2 text-neutral-400 my-2 px-2 hover:bg-[--background-tinted-highlight] song rounded-lg cursor-pointer `} onClick={() => handlePlayPause()} >
            <div className='flex items-center py-1'>
                <div className={`text-end w-[20px] flex-shrink-0 me-6 hover-hidden ${track.track.id === playing.trackId ? 'text-[--text-bright-accent]' : null}`} >
                    {track.track.id === playing.trackId && playing.isPlaying ? <AnimatedBars /> : order + 1}
                </div>

                <div className="text-end w-[20px] me-[22px] ms-[2px] hover-show" >
                    {playing.isPlaying && track.track.id === playing.trackId ?
                        <IoPauseSharp style={{ fontSize: "20px", width: "20px", position: "relative", left: "5px" }} /> :
                        <IoPlaySharp style={{ fontSize: "20px", width: "20px", position: "relative", left: "5px" }} />}
                </div>

                <img
                    className='h-10 w-10 me-6'
                    src={track?.track?.album?.images[0]?.url}
                    alt="" />
                <div className=''>
                    <p className={`w-[180px] xl:w-[300px]  truncate ${track.track.id === playing.trackId ? 'text-[--text-bright-accent]' : 'text-white'}`}>{track.track.name}</p>

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
            <div className='flex items-center justify-end  ml-auto md:ml-0'>
                <p className='w-[90%] xl:w-[50%] hidden @lg:inline truncate'>{track.track.album.name}</p>

                <p className='w-[40%] ms-[10%] hidden @xl:inline truncate'>{toDateFormat(track.added_at)}</p>
                <p className='w-20 flex justify-end items-end pe-4'>{millisecondsToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song