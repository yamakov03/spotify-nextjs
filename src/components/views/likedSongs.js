/* eslint-disable @next/next/no-img-element */
import {
  ClockIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ShareIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
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


const appVariants = {
  initial: {
    opacity: 0,
    x: "5px",
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

function LikedSongs() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [playing, setPlaying] = useRecoilState(playingState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsState);

  useEffect(() => {
    (async () => {
      const pl = (await spotifyApi.getMySavedTracks({limit: 50})).body
      // var lim = pl.tracks.total
      var lim = 200;
      // if there is more tracks than the limit (100 by default)
      if (lim > pl.limit) {
        // Divide the total number of track by the limit to get the number of API calls
        for (let i = 1; i < Math.ceil(lim / pl.limit); i++) {
          const trackToAdd = (
            await spotifyApi.getMySavedTracks({limit:50,
              offset: pl.limit * i, // Offset each call by the limit * the call's index
            })
          ).body;

          // Push the retreived tracks into the array
          pl.items = pl.items.concat(trackToAdd.items);
        }
      }

      setLikedSongs(pl);
      setIsLoading(false);
    })();


  }, [spotifyApi, likedSongs]);

  const scrollTop = () => {
    var div = document.getElementById("mainContent");
    div.scrollTop = 0
  }

  return (
    <PerfectScrollbar
    onLoad={() => { scrollTop(), setIsLoading(false) }}
      id="mainContent"
      className={
        "h-[calc(100vh-5.5rem)] overflow-y-scroll rounded-md scrollbar-hide from-[--background-base] bg-gradient-to-b to-[--background-press] transition duration-200" +
        (isLoading ? " hidden " : "")
      }
    >

      {/* header */}
      <section
        className={`flex items-end space-x-0 lg:space-x-7  h-[350px] text-white pl-8 pr-8 pb-8 pt-6 `}
      >
        <div className="items-center justify-center align-middle h-56 w-56 hidden lg:flex shadow-2xl rounded-xl bg-gradient-to-b from-amber-400 to-fuchsia-600">
          <HeartIcon className="h-16 w-16 text-white"/>
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
                <p className="text-md text-[--text-subdued]">
                  about {(likedSongs?.total * 3) / 60} hr
                </p>
              </>
          </div>
        </div>
      </section>

      {/* songs */}
      <section className="bg-neutral-900 bg-opacity-70">
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
        <div className="">
          <div className="grid grid-cols-2 text-neutral-400  ps-4 pe-8 ">
            <div className="grid grid-cols-2 text-neutral-400 px-5" >
              <div className="flex items-center space-x-4 ">
                <p className="text-end w-[20px] me-1">#</p>
                <p>Title</p>
                <div></div>
              </div>
            </div>
            <div className='flex items-center justify-end  ml-auto md:ml-0'>
              <p className='w-[90%] xl:w-[50%] hidden lg:inline truncate'>Album</p>

              <p className='w-[40%] ms-[10%] hidden xl:inline truncate'>Date Added</p>
              <ClockIcon className="h-5 w-5 ms-[3.75rem] flex-shrink-0 justify-end items-end me-6" />
            </div>
          </div>
          <div className=" text-neutral-400 mt-2 px-8">
            <hr className="border-neutral-500 opacity-60  mb-2" />
          </div>

        </div>


        <Songs />
      </section>
    </PerfectScrollbar>
  );
}

export default LikedSongs;
