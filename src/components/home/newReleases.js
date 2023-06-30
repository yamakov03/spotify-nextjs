import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import AlbumCard from './shared/albumCard';

function NewReleases() {
  const spotifyApi = useSpotify();
  const [newReleases, setNewReleases] = useState(null);

  useEffect(() => {
    (async () => {
      const releases = (await spotifyApi.getNewReleases({
        country: 'ES',
        limit: 10
      })).body;

      setNewReleases(releases);
    })

      ();


  }, [spotifyApi]);



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
      <h1 className=" text-2xl font-semibold mb-4">Latino Releases</h1>

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {newReleases?.albums.items.map((album, i) => {
          return (typeof album != 'undefined' && album) ? <AlbumCard key={i} title={album.name} image={album?.images[0].url} albumId={album.id} releaseDate={album.release_date} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default NewReleases