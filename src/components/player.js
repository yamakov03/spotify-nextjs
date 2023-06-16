import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { debounce, set } from "lodash";
import SpotifyPlayer from "react-spotify-web-playback";
import { spotifyApi } from 'react-spotify-web-playback';
import { playlistIdState } from "../atoms/playlistAtom";
import { playingState } from "../atoms/playingAtom";
import { useEffect } from "react";
function Player() {
  const user = useSpotify();
  const [playing, setPlaying] = useRecoilState(playingState);

  return (
    <SpotifyPlayer
      token={user.getAccessToken()}
      uris={[`spotify:${playing.typePlaying}:${playing.typePlaying === "track" ? playing.trackId : playing.playlistId}`]}
      hideAttribution={true}
      persistDeviceSelection={true}
      showSaveIcon={true}
      play={playing.isPlaying}
      inlineVolume={true}
      styles={{
        activeColor: '#fff',
        bgColor: '#000',
        color: '#a7a7a7',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        sliderHandleColor: '#fff',
      }}
      callback={(state) => {
        if (!state.isPlaying) setPlaying({ ...playing, isPlaying: false });
        if (state.isPlaying) setPlaying({ ...playing, isPlaying: true });
        if (state.track.id !== playing.trackId) {
          setPlaying({ ...playing, trackId: state.track.id });
        }
      }}
    />
  );
}

export default Player;
