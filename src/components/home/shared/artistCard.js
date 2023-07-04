import React from 'react'
import { playingState } from '../../../atoms/playingAtom'
import { useRecoilState } from 'recoil';
import PlayBtn from '../../playBtn';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
function ArtistCard({ title, image, artistId }) {
  const [playing, setPlaying] = useRecoilState(playingState);
  return (
    <>
    {<div className='bg-[--background-tinted-base] cursor-pointer overflow-hidden rounded-[5px] p-4 group me-5 inline-block hover:bg-[--background-tinted-highlight] transition duration-200 ease-in-out w-[192px]'>
      <div className='w-[160px] h-[160px] relative rounded-[5px]'>
      <Image src={image} className='w-[160px] h-[160px] rounded-full shadow-lg shadow-black/20 absolute' width={160} height={160}/>
      </div>
      
      <p className='pt-2 text-md text-md font-semibold text-left truncate '>{title}</p>
      
      <div
        className="text-[--text-bright-accent] px-8 flex flex-col space-y-1 relative"
        onClick={() => {
          setPlaying({ ...playing, typePlaying: "artist", artistId: artistId, isPlaying: true })
        }
        }
      >
        <button className="box-border rounded-full cursor-pointer text-center shadow-lg shadow-black/200 absolute bottom-[30px] right-2 btn transition-all ease-in-out duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px]">
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
    </div> || <Skeleton />}
    </>

  )
}

export default ArtistCard