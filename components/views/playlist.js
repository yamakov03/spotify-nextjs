/* eslint-disable @next/next/no-img-element */
import { ClockIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { set, shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "../songs";
import ReactHtmlParser from "react-html-parser";
import ColorThief from "colorthief";
import { motion, Variants } from 'framer-motion';
import { isLoadingState } from "@/atoms/isLoadingAtom";
import { currentViewState } from "@/atoms/viewAtom";

const appVariants = {
  initial: {
    opacity: 0,
    x: '5px'
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
}

function Playlist() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const [colorH, setColorH] = useState([0, 0, 0]);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [view, setView] = useRecoilState(currentViewState);

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
      setColorH(rgb);
      var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
      setColor(`${hex}`);
    };
    // setColor(shuffle(colors).pop());
  }, [playlistId, color]);

  useEffect(() => {
    (async () => {
      const pl = (await spotifyApi.getPlaylist(playlistId)).body;
      // var lim = pl.tracks.total
      var lim = 200
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
          trackToAdd.items.forEach((item) => pl.tracks.items.push(item));
        }
      }
      setPlaylist(pl);
      setIsLoading(false);
      //setIsLoading(false);
    })();
  }, [spotifyApi, playlistId]);

  return (
    <div className={"h-[calc(100vh-5rem)] overflow-y-scroll bg-gradient-to-b to-neutral-900" + (isLoading ? " hidden" : "")}
        style={Object.assign(
          { '--tw-gradient-from': `${color}` + ' var(--tw-gradient-from-position)' },
          { '--tw-gradient-to': 'rgb(' + `${colorH[0]}` + ` ${colorH[1]}` + ` ${colorH[2]} / 0)` + ' var(--tw-gradient-to-position)' },
          { '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)' })}>
        {/* header */}
        <section
          className={`flex items-end space-x-7  h-[400px] text-white pl-8 pr-8 pb-8 pt-6`}

        >
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0].url}
            alt=""
            id="myImg"
            crossOrigin="anonymous"
          />
          <div>
            <p className="text-sm font-semibold mb-2">Playlist</p>
            <h1 className="xl:text-6xl md:text-4xl font-bold">
              {playlist?.name}
            </h1>
            <div className="text-neutral-200 text-sm mt-2">
              {ReactHtmlParser(playlist?.description)}
            </div>
            <div className="flex mt-2">
              <a className="text-sm font-semibold me-2" href={playlist?.owner.href}>{playlist?.owner.display_name}</a>
              <p className="text-sm">{playlist?.tracks?.total} songs {playlist?.tracks?.total > 200 ? " (200 shown)" : null}</p>
            </div>
          </div>
        </section>

        {/* playlist functions */}
        <section>

        </section>

        {/* songs */}
        <section className="bg-neutral-900 bg-opacity-70">
          <div className="text-white px-8 flex flex-col space-y-1">
            <div
              className="grid grid-cols-2 text-neutral-400 py-2 px-5
    rounded-lg"
            >
              <div className="flex items-center space-x-4 ">
                <p className="text-end w-[20px] me-1">#</p>
                <p>Title</p>
                <div></div>
              </div>
              <div
                className="flex items-center justify-between ml-auto first-letter
        md:ml-0"
              >
                <p className="w-40 hidden md:inline">Album</p>
                <ClockIcon className="h-5 w-5" />
              </div>
            </div>
            <hr className="border-t-[0.1px] border-neutral-700 mb-2" />
          </div>

          <Songs />
        </section>
    </div>    
 );
}

export default Playlist;
