import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify';
import ArtistCard from './artistCard';


function UserTopArtists() {
  const spotifyApi = useSpotify();
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    (async () => {
      const topArtists = (await spotifyApi.getMyTopArtists({
        limit: 20
      })).body;

      setArtists(topArtists);
    })

      ();


  }, [spotifyApi]);

  return (
    <div className='text-white'>
      <h1 className=" text-2xl font-bold mb-4 mx-6 ">Who you've been listening to recently</h1>

      <div className='overflow-x-scroll scrollbar-hide overflow-auto whitespace-nowrap ms-6 rounded-md'>
        {artists?.items.map((artist, i) => {
          return (typeof artist != 'undefined' && artist) ? <ArtistCard key={i} title={artist.name} image={artist.images[0].url} artistId={artist.id} /> : null
        }
        )}

      </div>
    </div>
  )
}

export default UserTopArtists