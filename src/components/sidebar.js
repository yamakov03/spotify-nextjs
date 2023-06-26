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
import { HeartIcon, PlusIcon } from "@heroicons/react/solid";
import { IoCaretDown } from "react-icons/io5";
import { preferencesState } from "../atoms/userPreferences";
import AnimatedBars from "./playlist/animatedBars";

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [view, setView] = useRecoilState(currentViewState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [playing, setPlaying] = useRecoilState(playingState);
    const [preferences, setPreferences] = useRecoilState(preferencesState);

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
        <>
            <div className="sidebar w-[15rem] bg-[--background-press] lg:w-[20rem] text-[--sidebar-text-light] ps-2 text-sm   flex flex-col flex-shrink-0 h-[calc(100vh-5rem)] pt-2"
                onLoad={function () {

                }}>
                <div className={`rounded-md mb-2 ${preferences.sidebar === "solarized" ? "bg-[--background-elevated-base]" :
                    preferences.sidebar === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-press]" : null}`
                }
                    style={{ backgroundColor: preferences.sidebar === "flat" ? preferences.sidebarColor : "var(--background-elevated-base)" }}>
                    <div className=" p-4 rounded-md text-[--sidebar-text-subdued] font-semibold text-md ">
                        <button className={`flex items-center space-x-3 mb-4 font-bold hover:text-[--text-highlight] transition duration-300 ease-out ${view === "home" ? "text-[--text-highlight]" : null}`}
                            onClick={() => setView("home")}>
                            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" className="me-1" data-encore-id="icon"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="currentColor"></path></svg>
                            <p>Home</p>
                        </button>
                        <button className={`flex items-center space-x-3 font-bold hover:text-[--text-highlight] transition duration-300 ease-out ${view === "search" ? "text-[--text-highlight]" : null}`}
                            onClick={() => setView("search")}>
                            <SearchIcon className="h-7 w-7" />
                            <p >Search</p>
                        </button>

                    </div>
                </div>
                <div className={`rounded-md h-[calc(100vh-5rem)] ${preferences.sidebar === "solarized" ? "g" + new Date().getHours() : preferences.sidebar === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-press]" : null}`}
                    style={{ backgroundColor: preferences.sidebar === "flat" ? preferences.sidebarColor : preferences.sidebar === "neutral" ? "var(--background-elevated-base)" : null }}>
                    <div className={`rounded-t-md z-40 pb-4  text-[--sidebar-text-subdued]`}>
                        <div className={`px-2 flex justify-between items-center  pt-5 font-semibold text-md ${view === "library" ? "text-[--text-highlight]" : null}`}>
                            <button className="flex items-center px-2 space-x-3 hover:text-[--text-highlight] transition duration-300 ease-out">
                                <svg role="img" height="1.75rem" width="1.75rem" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" fill="currentColor"></path></svg>
                                <p>Your Library</p>
                            </button>
                            <div className="flex items-center ">
                                <PlusIcon className="h-6 w-6 me-2 cursor-pointer hover:text-[--text-highlight]" />
                                <ArrowSmRightIcon className="h-7 w-7 cursor-pointer hover:text-[--text-highlight]" />
                            </div>

                        </div>
                    </div>
                    <div className={`flex-wrap flex-col rounded-b-md px-2 overflow-y-scroll scrollbar-hide h-[calc(100vh-260px)] `}>
                        <div className={`px-2 flex justify-between items-center text-[--sidebar-text-subdued] mb-2 text-md ${view === "library" ? "text-[--text-highlight]" : null}`}>
                            <button className={`flex items-center my-2 text-[--sidebar-text-subdued] hover:text-[--highlight] font-bold`}>
                                <SearchIcon className="h-5 w-5" />
                            </button>
                            <div className="flex items-center hover:text-[--text-highlight]">
                                <p className="text-md me-2">Recents</p>
                                <IoCaretDown className="h-4 w-4" />
                            </div>

                        </div>

                        {/* Playlists */}
                        <div className="roudned-md">
                            <div className={` hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md py-2 px-2 ${view === "likedsongs" ? "bg-[--background-tinted-base]" : null}`}
                                onClick={() => { { playing.playlistId !== "liked" ? setIsLoading(true) : null }; setPlaylistId("liked"); setView("likedsongs") }}>
                                <div className="items-center flex">
                                    <div className="items-center me-3 justify-center align-middle h-12 w-12 flex shadow-2xl rounded-[5px] bg-gradient-to-b from-amber-400 to-fuchsia-600">
                                        <HeartIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="flex-col truncate">
                                        <p
                                            className={`truncate text-md ${playing.playlistId === "liked" ? 'text-[--text-bright-accent]' : null}`}>Liked Songs</p>
                                        <p className="text-md text-[--sidebar-text-subdued] truncate" href="">Playlist • {session?.user.name}</p>
                                    </div>

                                </div>

                            </div>
                            {playlists.map((playlist) => (
                                <div key={playlist.id} className={`group hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md py-2 px-2 ${playlist.id === playlistId && view === "playlist" ? "bg-[--background-tinted-base]" : null}`}
                                    onClick={() => { { playlist.id !== playlistId ? setIsLoading(true) : null }; setPlaylistId(playlist.id); setView("playlist") }}>
                                    <div className="items-center flex">
                                        <img src={playlist?.images[0]?.url} alt="" className="h-12 w-12 rounded-[5px] cursor-pointer me-3" />
                                        <div className="flex-col truncate">
                                            <div className="flex">
                                                <p className={`truncate text-md text-[--sidebar-text-light] ${playlist.id === playing.playlistId && playing.typePlaying === "track" ? 'text-[--text-bright-accent]' : null}`}>{playlist.name}</p>
                                                {playlist.id === playing.playlistId && playing.typePlaying === "track" && playing.isPlaying ? <span className="relative bottom-[3px]"><AnimatedBars /></span> : null }
                                            </div>
                                            <p className="text-md text-[--sidebar-text-subdued] truncate" href={playlist?.owner.href}>Playlist • {playlist?.owner.display_name}</p>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>

                </div>


                <div id="dragbar"></div>
            </div>

        </>
    )
}

export default Sidebar