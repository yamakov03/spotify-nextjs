import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import AlbumCard from './shared/albumCard';
import PlaylistCard from './shared/playlistCard';

function TopPlaylists() {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState(null);

  useEffect(()=>{
    fetch('https://api.spotify.com/v1/browse/categories/country/playlists', {
      method: "GET",
      headers: {"Authorization": `Bearer ${spotifyApi.getAccessToken()}`}
    }).then(res => res.json()).then(json => setPlaylists(json['playlists']));
  },[]);

  // useEffect(() => {
  //   (async () => {
  //     const pl = (await spotifyApi.getPlaylistsForCategory({
  //       categoryId: 'toplists',
  //     })).body;

  //     setPlaylists(pl);
  //   })

  //     ();


  // }, [spotifyApi]);



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
      {console.log(playlists)}
      <h1 className=" text-2xl font-semibold mb-4">Hot country</h1>

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {playlists?.items.map((playlist, i) => {
          return (typeof playlist != 'undefined' && playlist) ? <PlaylistCard key={i} title={playlist.name} image={playlist?.images[0].url} playlistId={playlist.id} description={playlist.description} tracks={playlist.tracks.total} owner={playlist.owner.display_name} ownerHref={playlist.owner.href} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default TopPlaylists