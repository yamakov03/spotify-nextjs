import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { HeartIcon, ReplyIcon, VolumeOffIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { debounce, set } from "lodash";
import SpotifyPlayer from "react-spotify-web-playback";

function Player() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  return (
    <SpotifyPlayer
      token={spotifyApi.getAccessToken()}
      uris={[`spotify:track:${currentTrackId}`]}
      hideAttribution={true}
      persistDeviceSelection={true}
      showSaveIcon={true}
      play={isPlaying}
      inlineVolume={true}
      styles={{
        activeColor: '#fff',
        bgColor: '#333',
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
