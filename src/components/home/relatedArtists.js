import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './shared/artistCard';
import ScrollContainer from 'react-indiana-drag-scroll'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeftIcon, ArrowNarrowRightIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

function RelatedArtists() {
  const spotifyApi = useSpotify();
  const [artists, setArtists] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    spotifyApi.getMyTopArtists({
        limit: 1
      }).then((response) => {
        setName(response['body'].items[0].name)
        fetch(`https://api.spotify.com/v1/artists/${response['body'].items[0].id}/related-artists`, {
        method: "GET",
        headers: {"Authorization": `Bearer ${spotifyApi.getAccessToken()}`}
        }).then(res => res.json()).then(json => setArtists(json['artists']));
      })
    }, []);

  return (
    <div className='text-[--home-text-light]'>
      <TitleMd title={'Artists like ' + name}/>

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {artists?.map((artist, i) => {
          return (typeof artist != 'undefined' && artist) ? <ArtistCard key={i} title={artist.name} image={artist?.images[0].url} artistId={artist.id} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default RelatedArtists