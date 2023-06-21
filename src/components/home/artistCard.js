import React from 'react'
import { playingState } from '../../atoms/playingAtom'
import { useRecoilState } from 'recoil';

function ArtistCard({ title, image, artistId }) {
  const [playing, setPlaying] = useRecoilState(playingState);
  return (
    <div className='bg-neutral-800 cursor-pointer bg-opacity-50 rounded-md p-3 group me-4 inline-block hover:bg-neutral-700 transition duration-200 ease-in-out'>
      <img src={image} className='w-[180px] h-[180px] rounded-md shadow-lg'></img>
      <p className='pt-3 text-lg font-bold text-left truncate w-[180px]'>{title}</p>
      <div
        className="text-[--text-bright-accent] px-8 flex flex-col space-y-1 relative"
        onClick={() => {
          setPlaying({ ...playing, typePlaying: "artist", artistId: artistId, isPlaying: true })
        }
        }
      >
        <svg
          className="bg-black shadow-xl shadow-black/10 rounded-full absolute bottom-[40px] right-2 btn cursor-pointer transition-all ease-in-out duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px]"
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
    </div>

  )
}

export default ArtistCard