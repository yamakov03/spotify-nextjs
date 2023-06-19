'use client';
import {
    HomeIcon,
    SearchIcon,
    PlusCircleIcon,
    RssIcon,
    LogoutIcon,
    BookOpenIcon,
    ArrowRightIcon,
    ArrowSmRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { currentViewState } from "../atoms/viewAtom";
import { isLoadingState } from "../atoms/isLoadingAtom";
import { playingState } from "../atoms/playingAtom";
import { PlusIcon } from "@heroicons/react/solid";
import { IoCaretDown } from "react-icons/io5";

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
                    // Divide the total number of playlists by the limit to get the number of API calls
                    for (let i = 1; i < Math.ceil(userPl.total / userPl.limit); i++) {
                        const trackToAdd = (await spotifyApi.getUserPlaylists({
                            offset: userPl.limit * i // Offset each call by the limit * the call's index
                        })).body;
                        // Push the retreived playlists into the array
                        userPl.concat(trackToAdd.items);
                    }
                }
                setPlaylists(userPl.items);
            }
        })()
    }, [session, spotifyApi]);
    return (
        <div className="sm:w-[15rem] lg:w-[20rem] text-neutral-200 ps-2 text-xs lg:text-sm  hidden md:flex flex-col flex-shrink-0 h-[calc(100vh-5rem)] pt-2">
            <div className="px-4 bg-[--background-base] rounded-md py-4 mb-2">
                <div className="text-[--text-subdued] font-semibold text-md ">
                    <button className={`flex items-center mb-4 space-x-3 hover:text-white transition duration-300 ease-out`}
                        onClick={() => signOut()}>
                        <LogoutIcon className="h-7 w-7" />
                        <p>Logout</p>
                    </button>
                    <button className={`flex items-center space-x-3 mb-4 font-bold hover:text-white transition duration-300 ease-out ${view === "home" ? "text-white" : null}`}
                        onClick={() => setView("home")}>
                        <HomeIcon className="h-7 w-7" />
                        <p>Home</p>
                    </button>
                    <button className={`flex items-center space-x-3 font-bold hover:text-white transition duration-300 ease-out ${view === "search" ? "text-white" : null}`}
                        onClick={() => setView("search")}>
                        <SearchIcon className="h-7 w-7" />
                        <p >Search</p>
                    </button>

                </div>
            </div>
            <div className="bg-[--background-base] rounded-t-md z-40 pb-4">
                <div className={`px-2 flex justify-between items-center  mt-5 font-semibold text-[--text-subdued] text-md ${view === "library" ? "text-white" : null}`}>
                    <button className="flex items-center px-2 space-x-3 hover:text-white transition duration-300 ease-out">
                        <svg role="img" height="1.75rem" width="1.75rem" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" fill="currentColor"></path></svg>
                        <p>Your Library</p>
                    </button>
                    <div className="flex items-center ">
                        <PlusIcon className="h-6 w-6 me-2 cursor-pointer hover:text-white" />
                        <ArrowSmRightIcon className="h-7 w-7 cursor-pointer hover:text-white" />
                    </div>

                </div>
            </div>


            <div className="flex-wrap flex-col bg-[--background-base] rounded-b-md px-2 overflow-y-scroll scrollbar-hide ">
                <div className={`px-2 flex justify-between items-center text-[--text-subdued] text-md ${view === "library" ? "text-white" : null}`}>
                    <button className={`flex items-center my-2 text-[--text-subdued] hover:text-white font-bold`}>
                        <SearchIcon className="h-5 w-5" />
                    </button>
                    <div className="flex items-center hover:text-white">
                        <p className="text-md me-2">Recents</p>
                        <IoCaretDown className="h-4 w-4" />
                    </div>

                </div>

                {/* Playlists */}
                {playlists.map((playlist) => (
                    <div key={playlist.id} className={` hover:bg-neutral-800 cursor-pointer rounded-md py-2 px-2 
                    ${playlist.id === playlistId && view === "playlist" ? "bg-neutral-700" : null}`}
                        onClick={() => { { playlist.id !== playlistId ? setIsLoading(true) : null }; setPlaylistId(playlist.id); setView("playlist") }}>
                        <div className="items-center flex">
                            <img src={playlist.images[0]?.url} alt="" className="h-12 w-12 rounded-md cursor-pointer me-3" />
                            <div className="flex-col truncate">
                                <p
                                    className={`truncate text-sm ${playlist.id === playing.playlistId ? 'text-[--text-bright-accent]' : null}`}>{playlist.name}</p>
                                <p className="text-sm text-neutral-400 truncate" href={playlist?.owner.href}>Playlist • {playlist?.owner.display_name}</p>
                            </div>

                        </div>

                    </div>


                ))}

            </div>


        </div>
    )
}

export default Sidebar