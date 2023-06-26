import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { debounce, set } from "lodash";
import SpotifyPlayer from "react-spotify-web-playback";
import { playingState } from "../atoms/playingAtom";
import { useEffect, useRef, useState } from "react";
import { playlistState } from "../atoms/playlistAtom";
import { spotifyApi } from "react-spotify-web-playback";
import { currentViewState } from "../atoms/viewAtom";
import { likedSongsState } from "../atoms/playlistAtom";

function Player() {
  const user = useSpotify();
  const [playing, setPlaying] = useRecoilState(playingState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [player, setPlayer] = useState(null);
  const [prevState, setPrevState] = useState(null);
  const ref = useRef(null);
  const [shuffle, setShuffle] = useState(false);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [view, setView] = useRecoilState(currentViewState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsState);


  const playNext = () => {
    if (playing.playlistId === "liked") {
      var index = Math.floor(Math.random() * (likedSongs?.items.length - 1 - 0) + 0);
      shuffle ?
        setPlaying({
          ...playing,
          typePlaying: "track",
          trackOrder: index,

          trackId: likedSongs?.items[index]?.track?.id,

          isPlaying: true
        })
        :
        setPlaying({
          ...playing,
          typePlaying: "track",
          trackOrder: playing.trackOrder + 1,

          trackId: playing.trackOrder === likedSongs?.items.length ? null : likedSongs?.items[playing.trackOrder + 1]?.track?.id,

          isPlaying: true
        })
    } else if (playing.typePlaying === "track") {
      var index = Math.floor(Math.random() * (playlist?.tracks.items.length - 1 - 0) + 0);
      shuffle ?
        setPlaying({
          ...playing,
          typePlaying: "track",
          trackOrder: index,

          trackId: playlist?.tracks?.items[index]?.track?.id,

          isPlaying: true
        })
        :
        setPlaying({
          ...playing,
          typePlaying: "track",
          trackOrder: playing.trackOrder + 1,

          trackId: playing.trackOrder === playlist?.tracks.items.length ? null : playlist?.tracks?.items[playing.trackOrder + 1]?.track?.id,

          isPlaying: true
        })
    }
  }

  const playPrev = () => {
    if (playing.playlistId === "liked") {
    setPlaying({ ...playing, trackOrder: playing.trackOrder - 1, trackId: likedSongs?.items[playing.trackOrder - 1].track.id, isPlaying: true })
    }
    else if (playing.typePlaying === "track") {
      setPlaying({ ...playing, trackOrder: playing.trackOrder - 1, trackId: playlist?.tracks.items[playing.trackOrder - 1].track.id, isPlaying: true })
    }
  }
  const handleShuffle = () => {
    setShuffle(!shuffle);
  }

  return (
    <div onLoad={() => {
      var target = document.querySelector('._SliderRSWP')
      var observer = new MutationObserver(function (mutations) {
        if (target.getAttribute('data-position') === '99.9') {
          playNext();
        }
      });
      observer.observe(target, {
        attributes: true
      });
    }
    } className="min-w-[26rem] ">
      

      <SpotifyPlayer
        ref={ref}
        name="Spotify Next Web Player"
        updateSavedStatus={(value) => {
        }}

        token={user.getAccessToken()}
        uris={playing.typePlaying === 'track' ? [`spotify:track:${playing?.trackId}`] : playing.typePlaying === 'artist' ? [`spotify:artist:${playing?.artistId}`] : [`spotify:playlist:${playing?.playlistId}`]}
        hideAttribution={true}
        persistDeviceSelection={true}
        showSaveIcon={true}
        getPlayer={(value) =>
          setPlayer(value)

        }
        components={{
          rightButton:
            <div aria-label="Next" disabled="" title="Next" type="button" className="flex align-middle justify-center">

              <button onClick={() => {
                if (playing.typePlaying === "track")
                  playNext();
                else
                  user.skipToNext();

              }}
                className=" hover:text-[--text-light]">
                <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className="relative right-[15px]"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" fill="currentColor"></path></svg>
              </button>
            </div>,


          leftButton:
            <div className="flex align-middle justify-center">
              <button onClick={() => { handleShuffle() }} className={`hover:text-[--text-light] relative left-[-10px] `}>
                <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className={`${shuffle ? 'text-[--text-bright-accent]' : null}`} ><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z" fill="currentColor"></path><path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z" fill="currentColor"></path></svg>
                <p className={` top-[-2px] right-[5px] text-[30px] absolute ${shuffle ? ' inline text-[--text-bright-accent]' : 'hidden'}`}>.</p>
              </button>
              <button aria-label="Previous" type="button" onClick={() => {
                if (playing.typePlaying === "track") playPrev()
                else try {
                  user.skipToPrevious()
                } catch {
                  
                } 

              }}
                className=" hover:text-[--text-light]">
                <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" className="relative left-[16px]"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" fill="currentColor"></path></svg>
              </button>
            </div>
        }}

        play={playing.isPlaying}
        inlineVolume={true}
        styles={{
          activeColor: '#1cb954',
          bgColor: 'var(--background-press)',
          color: '#9a9a9a',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          trackArtistColor: 'var(--text-subdued)',
          trackNameColor: 'var(--text-light)',
          sliderHandleColor: 'var(--text-light)',
        }}
        callback={(state) => {
          setPlaying({ ...playing, trackId:state.track.id, isPlaying: state.isPlaying })
        }}
      />
    </div>

  );
}

export default Player;
