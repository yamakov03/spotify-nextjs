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
import { preferencesState } from "../atoms/userAtom";
import AnimatedBars from "./playlist/animatedBars";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getGradient, getHours } from "../lib/time";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrowMenu, RightArrowMenu } from "./shared/horizontalScrollIcons";
import Image from 'next/image'
import { useClickAway } from "@uidotdev/usehooks";


function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    const [playlists, setPlaylists] = useState([]);
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);

    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [artistsId, setArtistsId] = useState(null);
    const [albumsId, setAlbumsId] = useState(null);
    const [view, setView] = useRecoilState(currentViewState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [playing, setPlaying] = useRecoilState(playingState);
    const [preferences, setPreferences] = useRecoilState(preferencesState);

    const [sidebarView, setSidebarView] = useState('playlists');
    const [searchVal, setSearchVal] = useState('');
    const [inputFocused, setInputFocused] = useState(false);

    const handleInput = (e) => {
        setSearchVal(e.target.value);
        if (sidebarView == 'playlists') {
            setFilteredPlaylists(playlists.filter((playlist) => { return playlist.name.toLowerCase().includes(e.target.value.toLowerCase()) }));
        } else if (sidebarView == 'artists') {
            setFilteredArtists(artists.filter((artist) => { return artist.name.toLowerCase().includes(e.target.value.toLowerCase()) }));
        } else if (sidebarView == 'albums') {
            setFilteredAlbums(albums.filter((album) => { return album.album.name.toLowerCase().includes(e.target.value.toLowerCase()) }));
        }
    }

    const handleClearBtn = () => {
        setSearchVal('');
        handleInput({ target: { value: '' } });
    }

    const inputRef = useClickAway(() => {
        setInputFocused(false);
    });

    useEffect(() => {
        if (sidebarView == 'playlists') {
            (async () => {
                if (spotifyApi.getAccessToken()) {
                    const response = (await spotifyApi.getUserPlaylists({ limit: 50 })).body;
                    if (response.total > response.limit) {
                        // Divide the total number of playlists by the limit to get the number of API calls
                        for (let i = 1; i < Math.ceil(response.total / response.limit); i++) {
                            const trackToAdd = (await spotifyApi.getUserPlaylists({
                                offset: response.limit * i // Offset each call by the limit * the call's index
                            })).body;
                            // Push the retreived playlists into the array
                            response.concat(trackToAdd.items);
                        }
                    }
                    setPlaylists(response.items);
                    setFilteredPlaylists(response.items);
                }
            })()
        } else if (sidebarView == 'artists') {
            (async () => {
                if (spotifyApi.getAccessToken()) {
                    const response = (await spotifyApi.getMyTopArtists({ limit: 50 })).body;
                    if (response.total > response.limit) {
                        // Divide the total number of playlists by the limit to get the number of API calls
                        for (let i = 1; i < Math.ceil(response.total / response.limit); i++) {
                            const trackToAdd = (await spotifyApi.getUserPlaylists({
                                offset: response.limit * i // Offset each call by the limit * the call's index
                            })).body;
                            // Push the retreived playlists into the array
                            response.concat(trackToAdd.items);
                        }
                    }
                    setArtists(response.items);
                    setFilteredArtists(response.items);
                }
            })()
        } else if (sidebarView == 'albums') {
            (async () => {
                if (spotifyApi.getAccessToken()) {
                    const response = (await spotifyApi.getMySavedAlbums({ limit: 50 })).body;
                    if (response.total > response.limit) {
                        // Divide the total number of playlists by the limit to get the number of API calls
                        for (let i = 1; i < Math.ceil(response.total / response.limit); i++) {
                            const trackToAdd = (await spotifyApi.getUserPlaylists({
                                offset: response.limit * i // Offset each call by the limit * the call's index
                            })).body;
                            // Push the retreived playlists into the array
                            response.concat(trackToAdd.items);
                        }
                    }
                    setAlbums(response.items);
                    setFilteredAlbums(response.items);
                }
            })()
        }
    }, [session, sidebarView]);

    useEffect(() => {
        let dragging = 0,
            body = document.body,
            target = document.getElementById('dragbar');

        function clearJSEvents() {
            dragging = 0;
            body.removeEventListener("mousemove", resize);
            body.classList.remove('resizing');
        }

        function resize(e) {
            if (e.pageX > 600 || e.pageX < 80) {
                return;
            }
            if (e.pageX < 260 && e.pageX > 80) {
                body.style.setProperty("--left-width", 80 + 'px');
            } else {
                body.style.setProperty("--left-width", e.pageX + 'px');
            }

        }

        target.onmousedown = function (e) {
            e.preventDefault();
            dragging = 1;
            body.addEventListener('mousemove', resize);
            body.classList.add('resizing');
        };

        document.onmouseup = function () {
            dragging ? clearJSEvents() : '';
        };
    }, [])
    useEffect(() => {
        window.addEventListener('resize', function (event) {
            if (window.innerWidth < 800) {
                document.body.style.setProperty("--left-width", 80 + 'px');
            }
        }, true);
    }, [])

    return (
        <>
            <div id='sidebar' className="sidebar @container bg-[--background-press] text-[--sidebar-text-light] ps-2 pt-2 text-sm flex flex-col flex-shrink-0"
                onLoad={function () {

                }}>
                <div className={`rounded-md mb-2 ${preferences.sidebar === 'solarized' ? 'g' + getHours() + 'p ' : null} `}
                    style={{
                        backgroundColor: preferences.sidebar === "flat" ? preferences.sidebarColor : preferences.sidebar === "neutral" ? "var(--background-elevated-base)" : null
                    }}>
                    <div className=" p-4 rounded-md text-[--sidebar-text-subdued] font-semibold text-md ">
                        <button className={`flex items-center mb-4 space-x-3 ms-2 font-semibold hover:text-[--text-highlight] transition duration-200 ease-out ${view === "home" ? "text-[--text-highlight]" : null}`}
                            onClick={() => setView("home")}>
                            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" className="me-1" data-encore-id="icon"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="currentColor"></path></svg>
                            <p className="@[80px]:visible invisible">Home</p>
                        </button>
                        <button className={`flex items-center space-x-3 ms-2 font-semibold hover:text-[--text-highlight] transition duration-200 ease-out ${view === "search" ? "text-[--text-highlight]" : null}`}
                            onClick={() => setView("search")}>
                            <SearchIcon className="h-7 w-7" />
                            <p className="@[80px]:visible invisible">Search</p>
                        </button>

                    </div>
                </div>
                <div id='librarySidebar' className={`rounded-md ${preferences.sidebar === "solarized" ? getGradient() : preferences.sidebar === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-press]" : null}`}
                    style={{ backgroundColor: preferences.sidebar === "flat" ? preferences.sidebarColor : preferences.sidebar === "neutral" ? "var(--background-elevated-base)" : null }}>
                    <div className={`rounded-t-md z-40 text-[--sidebar-text-subdued]`}>
                        <div className={`px-2 flex justify-between items-center  pt-2 font-semibold text-md @[80px]:mb-0 mb-2 ${view === "library" ? "text-[--text-highlight]" : null}`}>
                            <button className="flex flex-shrink-0 items-center px-2 space-x-3 ms-2 hover:text-[--text-highlight] transition duration-200 ease-out" onClick={() => { parseInt(document.body.style.getPropertyValue("--left-width").substring(0, 3)) > 250 ? document.body.style.setProperty("--left-width", 80 + 'px') : document.body.style.setProperty("--left-width", 300 + 'px') }}>
                                <svg role="img" height="1.75rem" width="1.75rem" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" fill="currentColor"></path></svg>
                                <p className="@[80px]:visible invisible">Your Library</p>
                            </button>
                            <button className={`group flex items-center my-2 text-[--sidebar-text-subdued] hover:text-[--highlight] font-semibold hover:bg-[--background-tinted-base] rounded-full me-2 `}>
                                <PlusIcon className="h-[1.25rem] w-[1.25rem] m-1.5 cursor-pointer group-hover:text-[--text-highlight] transition duration-200" />
                            </button>

                        </div>
                        <div className="@[80px]:flex hidden mt-2 ms-4">
                            <ScrollMenu LeftArrow={LeftArrowMenu} RightArrow={RightArrowMenu} className="@[80px]:flex hidden flex-row overflow-x-scroll overflow-auto whitespace-nowrap text-[--sidebar-text-light]">
                                <div className={`flex items-center justify-center rounded-full me-2 px-3 py-1.5 cursor-pointer hover:bg-[--background-tinted-highlight] transition duration-200 ${sidebarView === 'playlists' ? 'bg-[--background-tinted-press]' : 'bg-[--background-tinted-base]'}`}
                                    onClick={() => setSidebarView("playlists")}>
                                    <p>Playlists</p>
                                </div>
                                <div className={`flex items-center justify-center rounded-full me-2 px-3 py-1.5 cursor-pointer hover:bg-[--background-tinted-highlight] transition duration-200 ${sidebarView === 'artists' ? 'bg-[--background-tinted-press]' : 'bg-[--background-tinted-base]'}`}
                                    onClick={() => setSidebarView("artists")}>
                                    <p>Artists</p>
                                </div>
                                <div className={`flex items-center justify-center rounded-full me-2 px-3 py-1.5 cursor-pointer hover:bg-[--background-tinted-highlight] transition duration-200 ${sidebarView === 'albums' ? 'bg-[--background-tinted-press]' : 'bg-[--background-tinted-base]'}`}
                                    onClick={() => setSidebarView("albums")}>
                                    <p>Albums</p>
                                </div>
                            </ScrollMenu>

                        </div>
                    </div>
                    <PerfectScrollbar className={`flex-wrap flex-col rounded-b-md overflow-y-scroll h-[calc(100vh-260px)] @[80px]:h-[calc(100vh-292px)]`} options={{ suppressScrollX: true }}>
                        <div className={`@[80px]:flex hidden px-2 justify-between items-center text-[--sidebar-text-subdued] text-md ${view === "library" ? "text-[--text-highlight]" : null}`}>
                            <div ref={inputRef} className={`flex items-center ms-2 mb-3 mt-3 `}>
                                <button className={`z-30 group p-2 flex items-center text-[--sidebar-text-subdued] hover:text-[--highlight] font-bold ${!inputFocused ? 'hover:bg-[--background-tinted-base]' : null} rounded-full `}
                                    onClick={() => setInputFocused(!inputFocused)}>
                                    <SearchIcon className="h-5 w-5 cursor-pointer group-hover:text-[--text-highlight] transition duration-200" />
                                </button>

                                    <div className="relative">
                                        <input  
                                            onClick={() => setInputFocused(true)}
                                            onChange={handleInput}
                                            value={searchVal}
                                            type="text"
                                            name="product-search"
                                            id="product-search"
                                            placeholder={"Search in " + sidebarView}
                                            className={`${inputFocused ? 'visible bg-[--background-tinted-highlight] translate-x-5 opacity-100' : 'invisible bg-[--background-tinted-base] opacity-0'} transition-all duration-200 absolute left-[-55px] top-[-18px] rounded-[5px] py-2 ps-10  w-[227px] h-[36px] bg-transparent outline-none text-[--sidebar-text-light] placeholder-[--sidebar-text-subdued]`}
                                        />
                                        <svg className={`absolute left-[170px] top-[-8px] text-[--sidebar-text-subdued] ${searchVal ? 'visible' : 'invisible'}`}
                                            onClick={handleClearBtn}
                                            role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"><path d="M1.47 1.47a.75.75 0 0 1 1.06 0L8 6.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L9.06 8l5.47 5.47a.75.75 0 1 1-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 0 1 0-1.06z" fill="currentColor"></path></svg>

                                    </div>
                            </div>

                            <div className={`flex items-center hover:text-[--text-highlight] cursor-pointer me-4 ${inputFocused ? 'invisible' : 'visible'}`}>
                                <p className="text-md me-2">Recents</p>
                                <IoCaretDown className="h-4 w-4" />
                            </div>

                        </div>

                        {/* Playlists */}
                        {sidebarView === "playlists" ?
                            <div id='playlists' className="rounded-md">
                                <div id='playlists' className={`group hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md px-2 py-2 mx-1 ${view === "likedsongs" ? "bg-[--background-tinted-base]" : null}`}
                                    onClick={() => { { playing.playlistId !== "liked" && view != "likedsongs" ? (setIsLoading(true), setPlaylistId("liked"), setView("likedsongs")) : null }; }}>
                                    <div id='playlists' className="items-center flex">
                                        {/* <div className="items-center me-3 justify-center align-middle h-12 w-12 flex shadow-2xl rounded-[5px] bg-gradient-to-b from-amber-400 to-fuchsia-600">
                                        <HeartIcon className="h-7 w-7 text-white" />
                                    </div> */}

                                        <img src="/icons/likedSongImg.png" alt="likedSongImg" className="h-12 w-12 rounded-[5px] cursor-pointer me-3" />
                                        <div className="flex-col truncate">
                                            <div className="flex">
                                                <p className={`truncate text-md ${playing.playlistId === "liked" ? 'text-[--text-bright-accent]' : null}`}>Liked Songs</p>
                                                {playing.playlistId === "liked" && playing.isPlaying ? <span className="relative bottom-[3px]"><AnimatedBars /></span> : null}
                                            </div>
                                            <p className="text-md text-[--sidebar-text-subdued] truncate" href="">Playlist • {session?.user.name}</p>
                                        </div>

                                    </div>

                                </div>
                                {filteredPlaylists.map((playlist) => (
                                    <div id='playlists' key={playlist.id} className={`group hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md px-2 py-2 mx-1 ${playlist.id === playlistId && view === "playlist" ? "bg-[--background-tinted-base]" : null}`}
                                        onClick={(e) => { { playlist.id !== playlistId ? (setIsLoading(true), setPlaylistId(playlist.id), setView("playlist")) : null }; }}>
                                        <div id='playlists' className="items-center flex">
                                            <Image src={playlist?.images[0]?.url} alt="" className="h-12 w-12 rounded-[5px] cursor-pointer me-3" loading="lazy" width={48} height={48} />
                                            <div id='playlists' className="flex-col truncate">
                                                <div id='playlists' className="flex">
                                                    <p className={`truncate text-md text-[--sidebar-text-light] ${playlist.id === playing.playlistId && playing.typePlaying === "track" ? 'text-[--text-bright-accent]' : null}`}>{playlist.name}</p>
                                                    {playlist.id === playing.playlistId && playing.typePlaying === "track" && playing.isPlaying ? <span className="relative bottom-[3px]"><AnimatedBars /></span> : null}
                                                </div>
                                                <p className="text-md text-[--sidebar-text-subdued] truncate" href={playlist?.owner.href}>Playlist • {playlist?.owner.display_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            : sidebarView === "artists" ?
                                <div className="rounded-md">
                                    {filteredArtists.map((artist) => (
                                        <div id='' key={artist.id} className={`group hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md px-2 py-2 mx-1 ${artist.id === artistsId && view === "artist" ? "bg-[--background-tinted-base]" : null}`}
                                            onClick={(e) => { { artist.id !== artistsId ? (setIsLoading(true), setArtistsId(artist.id), setView("artist")) : null }; }}>
                                            <div className="items-center flex">
                                                <Image src={artist?.images[0]?.url} alt="" className="h-12 w-12 rounded-full cursor-pointer me-3" loading="lazy" width={48} height={48} />
                                                <div className="flex-col truncate">
                                                    <div className="flex">
                                                        <p className={`truncate text-md text-[--sidebar-text-light] ${artist.id === playing.artistId && playing.typePlaying === "artist" ? 'text-[--text-bright-accent]' : null}`}>{artist.name}</p>
                                                        {artist.id === playing.artistId && playing.typePlaying === "artist" && playing.isPlaying ? <span className="relative bottom-[3px]"><AnimatedBars /></span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>


                                : sidebarView === "albums" ?
                                    <div id='playlists' className="rounded-md">
                                        {filteredAlbums.map((album) => (
                                            <div id='playlists' key={album.album.id} className={`group hover:bg-[--background-tinted-highlight] cursor-pointer rounded-md px-2 py-2 mx-1 ${album.album.id === albumsId && view === "album" ? "bg-[--background-tinted-base]" : null}`}
                                                onClick={(e) => { { album.album.id !== albumsId ? (setIsLoading(true), setAlbumsId(album.album.id), setView("album")) : null }; }}>
                                                <div id='playlists' className="items-center flex">
                                                    <Image src={album?.album.images[0]?.url} alt="" className="h-12 w-12 rounded-[5px] cursor-pointer me-3" loading="lazy" width={48} height={48} />

                                                    <div id='playlists' className="flex-col truncate">
                                                        <div id='playlists' className="flex">
                                                            <p className={`truncate text-md text-[--sidebar-text-light] ${album.album.id === playing.albumId && playing.typePlaying === "album" ? 'text-[--text-bright-accent]' : null}`}>{album.album.name}</p>
                                                            {album.album.id === playing.albumId && playing.typePlaying === "album" && playing.isPlaying ? <span className="relative bottom-[3px]"><AnimatedBars /></span> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                    : null
                        }

                    </PerfectScrollbar>

                </div>
                <div id="dragbar"></div>
            </div>
        </>
    )
}

export default Sidebar