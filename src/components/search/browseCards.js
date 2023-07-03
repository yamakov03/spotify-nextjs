import React, { useEffect, useState } from 'react'
import TitleMd from '../shared/titleMedium'
import useSpotify from '../../hooks/useSpotify';
import BrowseCard from './browseCard';

function BrowseCards() {
  const spotifyApi = useSpotify();
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      const cats = (await spotifyApi.getCategories({
        country: 'US',
        limit: 48
      })).body;

      setCategories(cats.categories.items);
    })();
  }, [spotifyApi]);
  return (
    <div className='@container text-[--home-text-light]'>
      <h1 className="text-2xl font-semibold mb-4 mt-10">Browse all</h1>
      <div className='grid @[1500px]:grid-cols-8 @[1300px]:grid-cols-4 @sm:grid-cols-3 grid-cols-2 gap-6 w-full'>
        {categories?.map((category, i) => {
          return (typeof category != 'undefined' && category) ? <BrowseCard key={i} title={category.name} image={category.icons[0].url} /> : null
        }
        )}

      </div>
    </div>
  )
}

export default BrowseCards