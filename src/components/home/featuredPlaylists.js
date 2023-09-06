import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import { ScrollMenu} from 'react-horizontal-scrolling-menu';
import PlaylistCard from './shared/playlistCard';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

function Featured() {
  const spotifyApi = useSpotify();
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

  useEffect(() => {
    (async () => {
      const playlists = (await spotifyApi.getFeaturedPlaylists()).body;
      setFeaturedPlaylists(playlists);
    })();

  }, []);

  return (
    <div className='text-[--home-text-light]'>
      <TitleMd title={'Trending'} />

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {featuredPlaylists?.playlists.items.map((playlist, i) => {
          return (typeof playlist != 'undefined' && playlist) ? <PlaylistCard key={i} title={playlist.name} image={playlist?.images[0]?.url} playlistId={playlist.id} description={playlist.description} tracks={playlist.tracks.total} owner={playlist.owner.display_name} ownerHref={playlist.owner.href} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default Featured