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
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";
const Songs = dynamic(() => import("../playlist/songs"));
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import ColorThief from "colorthief";
import { isLoadingState } from "../../atoms/isLoadingAtom";
import { currentViewState } from "../../atoms/viewAtom";
import { playingState } from "../../atoms/playingAtom";
import { lumaRGB, lumaValue, shadeColor } from "../../lib/colors";

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

function Playlist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [colors, setColors] = useState([]);
  const [luma, setLuma] = useState(0);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [playing, setPlaying] = useRecoilState(playingState);

  useEffect(() => {
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }



    var sourceImage = document.getElementById("myImg");
    sourceImage.onload = function () {
      var colorThief = new ColorThief();
      var rgb = colorThief.getColor(sourceImage);

      var palette = colorThief.getPalette(sourceImage, 2);
      var hex = [rgbToHex(palette[0][0], palette[0][1], palette[0][2]), rgbToHex(palette[1][0], palette[1][1], palette[1][2])]

      var luma1 = lumaRGB(palette[0][0], palette[0][1], palette[0][2])
      var luma2 = lumaRGB(palette[1][0], palette[1][1], palette[1][2])

      if (luma1 > luma2) {
        if (luma1 > 0.8) {
          setColors([`${shadeColor(hex[0], -10)}`, `${hex[1]}`])
        } else {
          setColors([`${hex[0]}`, `${hex[1]}`]);
        }
      } else if (luma2 > 0.8) {
        setColors([`${shadeColor(hex[1], -10)}`, `${hex[0]}`])
      } else { setColors([`${hex[1]}`, `${hex[0]}`]); }
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
    })

      ();


  }, [spotifyApi, playlistId]);

  const scrollTop = () => {
    var div = document.getElementById("mainContent");
    div.scrollTop = 0;
  }

  return (
    <div
    onLoad={() => { scrollTop(), setIsLoading(false) }}
      id="mainContent"
      className={ 
        "h-[calc(100vh-5.5rem)] overflow-y-scroll bg-gradient-to-b  from-0% to-100%  rounded-md scrollbar-hide" +
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
        className={`flex items-end space-x-0 lg:space-x-7  h-[350px] text-white pl-8 pr-8 pb-8 pt-6 `}
      >
        <img
          className="h-56 w-56 hidden lg:inline shadow-2xl rounded-xl"
          src={playlist?.images?.[0].url}
          alt=""
          id="myImg"
          crossOrigin="anonymous"
        />
        <div>
          <p className="text-md font-semibold mb-2">Playlist</p>

          <h1 className="xl:text-7xl md:text-6xl text-2xl font-extrabold">
            {playlist?.name}
          </h1>
          <div className="text-neutral-200 text-md mt-2">
            {ReactHtmlParser(playlist?.description)}
          </div>
          <div className="flex mt-2">
            {playlist?.tracks?.total > 200 ?
              <>
                <a className="text-md font-semibold me-2" href={playlist?.owner?.href}>
                  {playlist?.owner?.display_name}&nbsp;&nbsp;•
                </a>
                <p className="text-md">
                  {playlist?.tracks?.total}&nbsp;songs&nbsp;
                </p>
                <p className="text-md text-neutral-500">
                  (200 shown),
                  about {(playlist?.tracks?.total * 3) / 60} hr
                </p>
              </>
              :
              <>
                <a className="text-md font-semibold me-2" href={playlist?.owner?.href}>
                  {playlist?.owner?.display_name}&nbsp;&nbsp;•
                </a>
                <p className="text-md">
                  {playlist?.tracks?.total}&nbsp;songs,&nbsp;
                </p>
                <p className="text-md text-neutral-500">
                  about {(playlist?.tracks?.total * 3) / 60} hr
                </p>
              </>}
          </div>
        </div>
      </section>

      {/* songs */}
      <section className="bg-neutral-900 bg-opacity-60">
        {/* playlist functions */}
        <div className="flex items-center py-7">
          <div
            className="text-[--text-bright-accent] px-8 flex flex-col space-y-1"
            onClick={() => {
              setPlaying({ ...playing, typePlaying: "track", trackOrder: 0, playlistId: playlistId, trackId: playlist?.tracks.items[0]?.track?.id, isPlaying: true })
            }
            }
          >
            <button className="box-border rounded-full cursor-pointer text-center bg-black shadow-xl shadow-black/10 btn transition-all ease-in-out duration-200">
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
            <hr className="border-neutral-500 opacity-60 mb-2" />
          </div>

        </div>


        <Songs />
      </section>
    </div>
  );
}

export default Playlist;
