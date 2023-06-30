import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';

function UserTopArtists() {
  const spotifyApi = useSpotify();
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    (async () => {
      const topArtists = (await spotifyApi.getMyTopArtists({
        limit: 50
      })).body;

      setArtists(topArtists);
    })();
  }, []);



  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-40 ${isFirstItemVisible ? 'invisible' : 'visible'}`} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer left-[10px] top-[90px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20 '>
          <ArrowLeftIcon onClick={() => scrollPrev()} className=' w-9 h-9 m-1 text-white'/>
        </div>
      </div>
    );
  }
  
  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-40 ${isLastItemVisible ? 'invisible' : 'visible'} `} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer right-[10px] top-[90px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20'>
          <ArrowRightIcon onClick={() => scrollNext()} className=' w-9 h-9 m-1 text-white'/>
        </div>
      </div>
    );
  }

  return (
    <div className='text-[--home-text-light]'>
      <h1 className=" text-2xl font-semibold mb-4">Artists you're listening to</h1>

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {artists?.items.map((artist, i) => {
          return (typeof artist != 'undefined' && artist) ? <ArtistCard key={i} title={artist.name} image={artist?.images[0].url} artistId={artist.id} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default UserTopArtists