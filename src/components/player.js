import useSpotify from "@/src/hooks/useSpotify";
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

  useEffect(() => {
      spotifyApi.getPlaybackState().then((data) => {
        console.log(data);
      });
      // console.log(data);
        console.log(playing)

  }, [playing, spotifyApi]);

  return (
    <SpotifyPlayer
      token={user.getAccessToken()}
      uris={[`spotify:${playing.type}:${playing.id}`]}
      hideAttribution={true}
      persistDeviceSelection={true}
      showSaveIcon={true}
      play={playing.isPlaying}
      inlineVolume={true}
      styles={{
        activeColor: '#fff',
        bgColor: 'var(--background-base)',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        sliderHandleColor: '#fff',
      }}
    />
  );
}

export default Player;
