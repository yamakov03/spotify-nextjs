import React from 'react'
import { playingState } from '../../../atoms/playingAtom';
import { useRecoilState } from 'recoil';
import { likedSongsState } from "../../../atoms/playlistAtom";

function TopItemsCard({ title, image, playlistId }) {
  const [playing, setPlaying] = useRecoilState(playingState);
  const [likedSongs, setLikedSongs] = useRecoilState(likedSongsState);
  return (
    <div className='flex items-center me-6 mb-3 group cursor-pointer truncate'>
      <img src={image} alt="img" className="md:h-[5rem] md:w-[5rem] w-[4rem] h-[4rem] rounded-s-[5px] cursor-pointer shadow-lg shadow-black/50" />

      <div className='md:h-[5rem] h-[4rem] truncate flex w-full items-center rounded-e-[5px] bg-[--background-tinted-base] group-hover:bg-[--background-tinted-highlight] transition duration-200'>
        <p className='ms-4 text-md font-semibold w-[90%] truncate hidden xs:inline'>{title}</p>
      </div>

      <div id='playlists' className="group-hover:visible invisible relative cursor-pointer ">
        <div id='playlists' className="absolute top-[20px] end-[90px]">
          <button id="playBtn"
            onClick={() => {
              setPlaying(playlistId === 'liked' ?
                { ...playing, typePlaying: "track", trackOrder: 0, playlistId: "liked", trackId: likedSongs?.items[0]?.track?.id, isPlaying: true } :
                { ...playing, typePlaying: "playlist", playlistId: playlistId, isPlaying: true })
            }
            }
            className="box-border rounded-full cursor-pointer text-center shadow-lg shadow-black/200 absolute md:bottom-[-8px] bottom-[-4px] md:left-[18px] left-[30px]  btn transition-all ease-in-out duration-200 opacity-0 group-hover:opacity-100">
            <span className="bg-[--text-bright-accent] text-black flex rounded-full md:w-[56px] md:h-[56px] w-[48px] h-[48px] items-center justify-center">
              <span aria-hidden="true">
                <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="text-black">
                  <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z">
                  </path>
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>


    </div>
  )
}

export default TopItemsCard