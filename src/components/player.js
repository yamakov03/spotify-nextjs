import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { debounce, set } from "lodash";
import SpotifyPlayer from "react-spotify-web-playback";
import { playingState } from "../atoms/playingAtom";
import { useState } from "react";
import { playlistState } from "../atoms/playlistAtom";

function Player() {
  const user = useSpotify();
  const [playing, setPlaying] = useRecoilState(playingState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [player, setPlayer] = useState(null);

  // useEffect(() => {
  //   if (player) {
  //   player.addListener('player_state_changed', (state) => {
  //     console.log(state)
  //     if (state.duration === state.position) {
  //       setPlaying({trackOrder: playing.trackOrder + 1, trackId: playlist?.tracks.items[playing.trackOrder + 1].track.id, isPlaying: true })
  //     }
  //   })
  // }}, [player, playing])

  return (
    <SpotifyPlayer
      token={user.getAccessToken()}
      uris={[`spotify:track:${playing?.trackId}`]}
      hideAttribution={true}
      persistDeviceSelection={true}
      showSaveIcon={true}
      getPlayer={(value) =>
        setPlayer(value)
      }
      components={{
        rightButton:
          <button onClick={() => setPlaying({ ...playing, trackOrder: playing.trackOrder + 1, trackId: playlist?.tracks.items[playing.trackOrder + 1].track.id, isPlaying: true })} className=" hover:text-white">
            <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="relative right-[20px]"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" fill="currentColor"></path></svg>
          </button>,

        leftButton:
          <button onClick={() => setPlaying({ ...playing, trackOrder: playing.trackOrder - 1, trackId: playlist?.tracks.items[playing.trackOrder - 1].track.id, isPlaying: true })} className=" hover:text-white">
            <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="relative left-[36px]"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" fill="currentColor"></path></svg>
          </button>,

      }}

      play={playing.isPlaying}
      inlineVolume={true}
      styles={{
        activeColor: '#1cb954',
        bgColor: '#000',
        color: '#a7a7a7',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        sliderHandleColor: '#fff',
      }}
      callback={(state) => {
        if (!state.isPlaying) setPlaying({ ...playing, isPlaying: false })
        if (state.isPlaying) setPlaying({ ...playing, isPlaying: true })

      }}
    />
  );
}

export default Player;
