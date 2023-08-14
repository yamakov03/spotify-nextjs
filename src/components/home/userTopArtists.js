import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

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

  return (
    <div className='text-[--home-text-light] '>
      <TitleMd title={'Your top artists'} />

      <ScrollMenu id='scrollMenu' className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {artists?.items.map((artist, i) => {
          return (typeof artist != 'undefined' && artist) ? <ArtistCard key={i} title={artist.name} image={artist?.images[0].url} artistId={artist.id} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default UserTopArtists