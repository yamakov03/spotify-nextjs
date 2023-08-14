import useSpotify from "./useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "@/atoms/songAtom";
import { useEffect, useState } from "react";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const songInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    },
                }
                ).then((res) => res.json());

                setSongInfo(songInfo);
            }
        };

        fetchSongInfo();
    }, [currentTrackId]);

    return songInfo;
}

export default useSongInfo