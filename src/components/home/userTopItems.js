import React, { useState } from 'react'
import TopItemsCard from './shared/topItemsCard'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../../hooks/useSpotify';
function UserTopItems() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      if (spotifyApi.getAccessToken()) {
        const userPl = (await spotifyApi.getUserPlaylists({ limit: 5 })).body;
        setPlaylists(userPl.items);
      }
    })()
  }, [session]);

  return (
    <div className='text-[--home-text-light]'>
      <div className='grid lg:grid-cols-3 grid-cols-2'>
        <TopItemsCard image="/icons/likedSongImg.png" title='Liked Songs' playlistId="liked" />
        {playlists?.map((playlist, i) => {
          return (typeof playlist != 'undefined' && playlist) ? <TopItemsCard key={i} title={playlist.name} image={playlist.images[0]?.url} playlistId={playlist.id} /> : null
        }
        )}

      </div>
    </div>
  )
}

export default UserTopItems