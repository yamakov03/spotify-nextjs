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
        <div className={`@container grid-container grid grid-cols-2 text-neutral-400 px-2 hover:bg-[--background-tinted-highlight] song rounded-[5px] cursor-pointer `} onClick={() => handlePlayPause()} >
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
                    className='h-10 w-10 me-6 hidden @sm:inline'
                    src={track?.track?.album?.images[0]?.url}
                    alt="" />
                <div className=''>
                    <p className={`w-[130px] sm:w-[220px] xl:w-[300px]  truncate ${track.track.id === playing.trackId ? 'text-[--text-bright-accent]' : 'text-white'}`}>{track.track.name}</p>

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
                <p className='w-[50%] @2xl:inline hidden truncate pe-4'>{track.track.album.name}</p>

                <p className='w-[40%] invisible @4xl:visible @xl:inline hidden truncate'>{toDateFormat(track.added_at)}</p>
                <p className='w-[10%] flex justify-end items-end pe-4 flex-shrink-0'>{millisecondsToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song