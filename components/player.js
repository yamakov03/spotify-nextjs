import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon } from '@heroicons/react/solid';
import {HeartIcon, ReplyIcon, VolumeOffIcon} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { debounce, set } from 'lodash';



function Player() {
    const spotifyApi = useSpotify();
    
    const { data: session, status } = useSession();
    const [isPremium, setIsPremium] = useState(false);
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const [volume, setVolume] = useState(50);
    const [player, setPlayer] = useState(null);
    const songInfo = useSongInfo();

    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            fetchCurrentSong();
            setVolume(100);
        }
    }, [currentTrackIdState, spotifyApi, session]);
    
    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getMe().then((data) => setIsPremium(data.body.product === 'premium'));
        }
    }, [session, status]);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(spotifyApi.getAccessToken()); },
                volume: 100
            });
    
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }
            
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
            
            
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));
    
    
            player.connect();
    
        };
    }, []);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now playing: ", data.body?.item?.name);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });

            });
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
          setVolume(100);
        } else {
          setVolume(0);
        }
      }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };

    useEffect(() => {
        if (volume > 0 && volume <= 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }, 500), 
        []
        );

    return (
        <div className='h-20 bg-neutral-900 border-t-[0.1px] border-neutral-700 text-white
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* Left */}
            <div className='flex items-center space-x-4'>
                <img className="hidden md:inline h-10 w-10" 
                src={songInfo?.album.images?.[0]?.url} 
                alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* Center */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='btn' />
                <RewindIcon onClick={() => spotifyApi.skipToPrevious()} className='btn' />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='btn w-10 h-10' />
                ): (
                    <PlayIcon onClick={handlePlayPause} className='btn w-10 h-10' />
                )}

                <FastForwardIcon onClick={() => spotifyApi.skipToNext()} className='btn' />
                <ReplyIcon className='btn' />
            </div>

            {/* Right */}
            <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeOffIcon className='btn' onClick={toggleMute}  />
                <input className='w-14 md:w-28'
                type='range' 
                min={0} max={100} 
                value={volume} 
                onChange={(e) => setVolume(Number(e.target.value))} />
            </div>
        </div>
    )
}

export default Player