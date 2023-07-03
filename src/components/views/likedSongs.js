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

function LikedSongs() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);

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

  const scrollTop = () => {
    var div = document.getElementById("mainContent");
    div.scrollTop = 0
  }

  return (
    <PerfectScrollbar
      onLoad={() => { scrollTop(), setIsLoading(false) }}
      id="mainContent"
      className={
        "min-w-[25rem] h-[calc(100vh-5.5rem)] overflow-y-scroll rounded-md scrollbar-hide from-[--background-base] bg-gradient-to-b to-[--background-press] transition duration-200" +
        (isLoading ? " hidden " : "")
      }
    >

      {/* header */}
      <section
        className={`flex items-end space-x-0 lg:space-x-7  h-[350px] text-white pl-8 pr-8 pb-8 pt-6 `}
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
              <a className="text-md font-semibold me-2" href="">
                {session?.user.name}&nbsp;&nbsp;•
              </a>
              <p className="text-md">
                {likedSongs?.total}&nbsp;songs,&nbsp;
              </p>
              <p className="text-md text-neutral-800 text-opacity-60">
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
            <svg
              className="btn cursor-pointer bg-black shadow-xl shadow-black/10 rounded-full "
              height="3.5em"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 64 64"
              width="3.5em"
            >
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm-7.61 18.188c-.435.251-.702.715-.701 1.216v25.194a1.402 1.402 0 0 0 2.104 1.214L47.61 33.214a1.402 1.402 0 0 0 0-2.428L25.793 18.188c-.435-.25-.97-.25-1.404 0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="btn text-[--text-subdued] flex flex-col space-y-1 cursor-pointer">
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
