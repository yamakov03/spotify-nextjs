/* eslint-disable @next/next/no-img-element */
import {
  ClockIcon
} from "@heroicons/react/outline";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
const Songs = dynamic(() => import("../playlist/songs"));
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import { isLoadingState } from "../../atoms/isLoadingAtom";
import { playingState } from "../../atoms/playingAtom";
import { getPrimaryColors, lumaRGB, rgbToHex, shadeColor } from "../../lib/colors";
import PerfectScrollbar from 'react-perfect-scrollbar'

function Playlist() {
  const spotifyApi = useSpotify();
  const [colors, setColors] = useState([]);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [playing, setPlaying] = useRecoilState(playingState);

  useEffect(() => {
    var sourceImage = document.getElementById("myImg");
    sourceImage.onload = function () {
      setColors(getPrimaryColors(sourceImage));
    }

  }, [playlistId, colors]);

  useEffect(() => {
    (async () => {
      const pl = (await spotifyApi.getPlaylist(playlistId)).body;
      // var lim = pl.tracks.total
      var lim = 200;
      // if there is more tracks than the limit (100 by default)
      if (lim > pl.tracks.limit) {
        // Divide the total number of track by the limit to get the number of API calls
        for (let i = 1; i < Math.ceil(lim / pl.tracks.limit); i++) {
          const trackToAdd = (
            await spotifyApi.getPlaylistTracks(playlistId, {
              offset: pl.tracks.limit * i, // Offset each call by the limit * the call's index
            })
          ).body;

          // Push the retreived tracks into the array
          pl.tracks.items = pl.tracks.items.concat(trackToAdd.items);
        }
      }

      setPlaylist(pl);
    })();

  }, [playlistId]);

  return (
    <PerfectScrollbar
      onLoad={() => {setIsLoading(false) }}
      id="mainContent"
      className={
        "min-w-[25rem] overflow-y-scroll bg-gradient-to-b  from-0% to-50%  rounded-md h-[calc(100vh-5.5rem)]" +
        (isLoading ? " hidden" : "")
      }
      style={Object.assign(
        {
          "--tw-gradient-from":
            `${colors[0]}` + " var(--tw-gradient-from-position)",
        },
        {
          "--tw-gradient-to":
            `${colors[1]}` +
            " var(--tw-gradient-to-position)",
        },
        {
          "--tw-gradient-stops":
            "var(--tw-gradient-from), var(--tw-gradient-to)",
        }
      )}
    >

      {/* header */}
      <section
        className={`@container flex items-end space-x-0 space-x-7  h-[350px] text-white pl-8 pr-8 pb-8 pt-6 `}
      >
        <img
          className="h-56 w-56 hidden @2xl:flex shadow-2xl rounded-xl"
          src={playlist?.images?.[0].url}
          alt=""
          id="myImg"
          crossOrigin="anonymous"
        />
        <div>
          <p className="text-md font-semibold mb-2">Playlist</p>

          <h1 className="2xl:text-7xl xl:text-6xl lg:text-3xl text-4xl font-extrabold">
            {playlist?.name}
          </h1>
          <div className="text-neutral-200 text-md mt-2">
            {ReactHtmlParser(playlist?.description)}
          </div>
          <div className="flex @lg:flex-row flex-col">
            <div className="flex-row flex">
              <p className="text-md font-semibold me-2" >
                {playlist?.owner?.display_name}&nbsp;&nbsp;•
              </p>
              <p className="text-md">
                {playlist?.tracks?.total}&nbsp;songs,&nbsp;
              </p>
            </div>
            <div className="flex">
              {playlist?.tracks?.total > 200 ?
                <p className="text-md text-neutral-300 text-opacity-80">
                  (200 shown),
                  about {(playlist?.tracks?.total * 3) / 60} hr
                </p>
                :
                <p className="text-md text-neutral-300 text-opacity-80">
                  about {(playlist?.tracks?.total * 3) / 60} hr
                </p>
              }
            </div>
          </div>
        </div>
      </section>

      {/* songs */}
      <section className="bg-neutral-900 bg-opacity-60 pb-4 @container">
        {/* playlist functions */}
        <div className="flex items-center py-7">
          <div
            className="text-[--text-bright-accent] px-8 flex flex-col space-y-1"
            onClick={() => {
              setPlaying({ ...playing, typePlaying: "track", trackOrder: 0, playlistId: playlistId, trackId: playlist?.tracks.items[0]?.track?.id, isPlaying: true })
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

export default Playlist;
