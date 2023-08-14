import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import AlbumCard from './shared/albumCard';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

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
    })();
  }, [spotifyApi]);

  return (
    <div className='text-[--home-text-light]'>
      <TitleMd title={'Latino releases'} />
      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {newReleases?.albums.items.map((album, i) => {
          return (typeof album != 'undefined' && album) ? <AlbumCard key={i} title={album.name} image={album?.images[0].url} albumId={album.id} releaseDate={album.release_date} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default NewReleases