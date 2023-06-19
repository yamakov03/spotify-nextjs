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
const Songs = dynamic(() => import("../songs"));
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import ColorThief from "colorthief";
import { isLoadingState } from "../../atoms/isLoadingAtom";
import { currentViewState } from "../../atoms/viewAtom";
import { playingState } from "../../atoms/playingAtom";

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

      var palette = colorThief.getPalette(sourceImage, 3);
      var hex = [rgbToHex(palette[0][0], palette[0][1], palette[0][2]), rgbToHex(palette[1][0], palette[1][1], palette[1][2])]

      if ((0.2126 * palette[0][0] + 0.7152 * palette[0][1] + 0.0722 * palette[0][2]) > (0.2126 * palette[1][0] + 0.7152 * palette[1][1] + 0.0722 * palette[1][2])) {
        setColors([`${hex[0]}`, `${hex[1]}`])
      }
      else { setColors([`${hex[1]}`, `${hex[0]}`]); }
    };
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
          pl.tracks.items.concat(trackToAdd.items);
        }
      }

      setPlaylist(pl);
    })();


  }, [spotifyApi, playlistId]);

  const scrollTop = () => {
    var div = document.getElementById("mainContent");
    div.scrollTop = 0;
  }

  return (
    <div

      id="mainContent"
      className={
        "h-[calc(100vh-5.5rem)] overflow-y-scroll bg-gradient-to-b  from-10% to-100%  rounded-md scrollbar-hide" +
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
          <p className="text-xl font-semibold mb-2">Playlist</p>

          <h1 className="xl:text-6xl md:text-4xl text-2xl font-bold">
            {playlist?.name}
          </h1>
          <div className="text-neutral-200 text-sm mt-2">
            {ReactHtmlParser(playlist?.description)}
          </div>
          <div className="flex mt-2">
            <a
              className="text-sm font-semibold me-2"
              href={playlist?.owner.href}
            >
              {playlist?.owner.display_name}&nbsp;&nbsp;•
            </a>
            <p className="text-sm">
              {playlist?.tracks?.total}&nbsp;songs
              {playlist?.tracks?.total > 200 ? " (200 shown)" : null},&nbsp;
            </p>
            <p className="text-sm text-[--text-subdued]">
              about {(playlist?.tracks?.total * 3) / 60} hr
            </p>
          </div>
        </div>
      </section>

      {/* songs */}
      <section className="bg-neutral-900 bg-opacity-70" onLoad={() => { scrollTop(), setIsLoading(false) }}>
        {/* playlist functions */}
        <div className="flex items-center py-7">
          <div
            className="text-[--text-bright-accent] px-8 flex flex-col space-y-1"
            onClick={() => {
              setPlaying({ playlistId: playlistId, isPlaying: true, trackId: playlist?.tracks.items[0]?.track?.id })
            }
            }
          >
            <svg
              className="btn cursor-pointer"
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
        <div className="grid grid-cols-2 text-neutral-400  ps-4 pe-8">
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
          <hr className="border-t-[0.1px] border-neutral-700 mb-2" />
        </div>

        <Songs />
      </section>
    </div>
  );
}

export default Playlist;
