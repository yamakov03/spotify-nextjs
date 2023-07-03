import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import AlbumCard from './shared/albumCard';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

function UserAlbums() {
  const spotifyApi = useSpotify();
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    (async () => {
      const releases = (await spotifyApi.getMySavedAlbums({
        limit: 50
      })).body;

      setAlbums(releases);
    })();
  }, [spotifyApi]);

  return (
    <div className='text-[--home-text-light]'>
      <TitleMd title={'Your albums'}/>

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {albums?.items.map((album, i) => {
          return (typeof album != 'undefined' && album) ? <AlbumCard key={i} title={album.album.name} image={album?.album.images[0].url} albumId={album.album.id} releaseDate={album.album.release_date} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default UserAlbums