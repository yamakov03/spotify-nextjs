/* eslint-disable @next/next/no-img-element */
import {
  ClockIcon
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../../hooks/useSpotify";
const Songs = dynamic(() => import("../playlist/songs"));
import dynamic from "next/dynamic";
import { isLoadingState } from "../../atoms/isLoadingAtom";
import { playingState } from "../../atoms/playingAtom";
import { HeartIcon } from "@heroicons/react/solid";
import { likedSongsState } from "../../atoms/playlistAtom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { currentViewState } from "../../atoms/viewAtom";
import { preferencesState } from "../../atoms/userAtom";
import { getGradient } from "../../lib/time";

function LikedSongs() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const preferences = useRecoilValue(preferencesState);

  useEffect(() => {
    (async () => {
      const returnedSongs = (await spotifyApi.getMySavedTracks({ limit: 50 })).body
      // var lim = pl.tracks.total
      var lim = 200;
      if (lim > returnedSongs.limit) {
        for (let i = 1; i < Math.ceil(lim / returnedSongs.limit); i++) {
          const trackToAdd = (
            await spotifyApi.getMySavedTracks({
              limit: 50,
              offset: returnedSongs.limit * i,
            })
          ).body;
          returnedSongs.items = returnedSongs.items.concat(trackToAdd.items);
        }
      }
      setLikedSongs(returnedSongs);
    })();
  }, []);

  return (

    <PerfectScrollbar
      onLoad={() => { setIsLoading(false) }}
      id="mainContent"

      className={`min-w-[25rem] h-[calc(100vh-5.5rem)] overflow-y-scroll rounded-md scrollbar-hide transition duration-200
      ${preferences.home === "solarized" ? getGradient() :
          preferences.home === "accent" ? "bg-gradient-to-b from-[--gradient-color] to-[--background-elevated-base] to-50%" : null} ${isLoading ? " hidden " : ""}`
      }
      style={{ backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)" }}
    >

      {/* header */}
      <section
        className={`flex items-end space-x-0 lg:space-x-7  h-[350px] text-[--home-text-light] pl-8 pr-8 pb-8 pt-6 `}
      >
        <div className="items-center justify-center align-middle h-56 w-56 hidden xl:flex shadow-2xl rounded-xl bg-gradient-to-b from-amber-400 to-fuchsia-600">
          <HeartIcon className="h-16 w-16 text-white" />
        </div>
        <div>
          <p className="text-md font-semibold mb-2">Playlist</p>

          <h1 className="xl:text-7xl md:text-6xl text-2xl font-extrabold">
            Liked Songs
          </h1>
          <div className="text-neutral-200 text-md mt-2">
          </div>
          <div className="flex mt-2">
            <>
              <p className="text-md font-semibold me-2">
                {session?.user.name}&nbsp;&nbsp;•
              </p>
              <p className="text-md">
                {likedSongs?.total}&nbsp;songs,&nbsp;
              </p>
              <p className="text-md ">
                about {(likedSongs?.total * 3) / 60} hr
              </p>
            </>
          </div>
        </div>
      </section>

      {/* songs */}
      <section className="bg-neutral-900 bg-opacity-70 pb-4">
        {/* playlist functions */}
        <div className="flex items-center py-7">
          <div
            className="text-[--text-bright-accent] px-8 flex flex-col space-y-1"
            onClick={() => {
              setPlaying({ ...playing, typePlaying: "track", trackOrder: 0, playlistId: "liked", trackId: likedSongs?.items[0]?.track?.id, isPlaying: true })
            }
            }
          >
            <button className="box-border rounded-full cursor-pointer text-center shadow-xl shadow-black/10 btn transition-all ease-in-out duration-200">
              <span className="bg-[--text-bright-accent] text-black flex rounded-full w-[56px] h-[56px] items-center justify-center">
                <span aria-hidden="true">
                  <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="text-black">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                    </path>
                  </svg>
                </span>
              </span>
            </button>
          </div>
          <div className="hover:text-white text-neutral-400 flex flex-col space-y-1 cursor-pointer">
            <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 haNxPq"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="currentColor"></path></svg>
          </div>
        </div>

        {/* songs header */}
        <div className="text-white sm:px-5 px-2 flex flex-col space-y-1">
          <div className={`@container grid-container grid grid-cols-2 text-neutral-400 px-2 song rounded-[5px]`}>
            <div className='flex items-center py-1'>
              <p className="text-end w-[20px] flex-shrink-0 me-6">#</p>
              <div className=''>
                <p className={`w-[180px] xl:w-[300px]  truncate`}>Title</p>
              </div>
            </div>
            <div className='flex items-center justify-end  ml-auto md:ml-0'>
              <p className='w-[50%] @2xl:inline hidden truncate'>Album</p>

              <p className='w-[40%] invisible @4xl:visible @xl:inline hidden truncate'>Date added</p>
              <div className="w-[10%] flex justify-end items-end pe-4 flex-shrink-0">
                <ClockIcon className=" h-5 w-5 flex-shrink-0 " />
              </div>
            </div>

          </div>
          <div className=" text-neutral-400 mt-2">
            <hr className="border-neutral-500 opacity-60 mb-2 " />
          </div>
        </div>


        <Songs />
      </section>
    </PerfectScrollbar>
  );
}

export default LikedSongs;
