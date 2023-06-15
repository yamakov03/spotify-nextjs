'use client';
import {
    HomeIcon,
    SearchIcon,
    PlusCircleIcon,
    RssIcon,
    LogoutIcon,
    BookOpenIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/src/atoms/playlistAtom";
import { currentViewState } from "@/src/atoms/viewAtom";
import { isLoadingState } from "@/src/atoms/isLoadingAtom";
import { playingState } from "../atoms/playingAtom";
function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [view, setView] = useRecoilState(currentViewState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [playing, setPlaying] = useRecoilState(playingState);

    useEffect(() => {
        (async () => {
            if (spotifyApi.getAccessToken()) {
                const userPl = (await spotifyApi.getUserPlaylists({ limit: 50 })).body;
                if (userPl.total > userPl.limit) {
                    // Divide the total number of track by the limit to get the number of API calls
                    for (let i = 1; i < Math.ceil(userPl.total / userPl.limit); i++) {
                        const trackToAdd = (await spotifyApi.getUserPlaylists({
                            offset: userPl.limit * i // Offset each call by the limit * the call's index
                        })).body;
                        // Push the retreived tracks into the array
                        userPl.concat(trackToAdd.items);
                    }
                }
                setPlaylists(userPl.items);
            }
        })()
    }, [session, spotifyApi]);
    return (
        <div className="text-neutral-500 pl-5 pr-5 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex relative h-[calc(100vh-5rem)] overflow-hidden">
            <div className="space-y-4 overflow-y-auto scrollbar-hide">
                <button className="flex items-center space-x-2 hover:text-white mt-5"
                    onClick={() => signOut()}>
                    <LogoutIcon className="h-5 w-5" />
                    <p>Logout</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white"
                onClick={() => setView("home")}>
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white"
                onClick={() => setView("search")}>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white"
                onClick={() => setView("library")}>
                    <BookOpenIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <div className="h-[.1px]"></div>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5 text-blue-500" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-neutral-800" />

                {/* Playlists */}
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => {setPlaylistId(playlist.id) ; {playlist.id !== playlistId ? setIsLoading(true) : null}; setView("playlist")  }}
                        className="cursor-pointer hover:text-white">{playlist.name}</p>
                ))}
                <div className="mb-5"></div>

            </div>
        </div>
    )
}

export default Sidebar