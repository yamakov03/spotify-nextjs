import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './artistCard';
import Song from '../playlist/song';

function UserTopTracks() {
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    (async () => {
      const topTracks = (await spotifyApi.getMyTopTracks({
        limit: 10
      })).body;

      setTracks(topTracks);
    })();


  }, [spotifyApi]);
  return (
    <div className='text-white'>
      <h1 className=" text-2xl font-semibold">Your top tracks</h1>
    </div>
  )
}

export default UserTopTracks