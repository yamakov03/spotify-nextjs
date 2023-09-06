import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import { ScrollMenu} from 'react-horizontal-scrolling-menu';
import PlaylistCard from './shared/playlistCard';
import { LeftArrowCard, RightArrowCard } from '../shared/horizontalScrollIcons';
import TitleMd from '../shared/titleMedium';

function CategoryPlaylists({ category, title }) {
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/browse/categories/${category}/playlists`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${spotifyApi.getAccessToken()}` }
    }).then(res => res.json()).then(json => setPlaylists(json['playlists']));
  }, []);

  return (
    <div className='text-[--home-text-light]'>
      <TitleMd title={title} />

      <ScrollMenu className='overflow-x-scroll overflow-auto whitespace-nowrap' LeftArrow={LeftArrowCard} RightArrow={RightArrowCard}>
        {playlists?.items.map((playlist, i) => {
          return (typeof playlist != 'undefined' && playlist) ? <PlaylistCard key={i} title={playlist.name} image={playlist?.images[0]?.url} playlistId={playlist.id} description={playlist.description} tracks={playlist.tracks.total} owner={playlist.owner.display_name} ownerHref={playlist.owner.href} /> : null
        }
        )}

      </ScrollMenu>
    </div>
  )
}

export default CategoryPlaylists