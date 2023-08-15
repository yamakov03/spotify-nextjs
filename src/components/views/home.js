import { getGradient, greeting } from "../../lib/time"
import { preferencesState } from "../../atoms/userAtom";
import { useRecoilState } from "recoil";
import UserTopArtists from "../home/userTopArtists"
import UserTopItems from "../home/userTopItems";
import FeaturedPlaylists from "../home/featuredPlaylists";
import UserAlbums from "../home/userAlbums";
import RelatedArtists from "../home/relatedArtists";
import CategoryPlaylists from "../home/categoryPlaylists";
import PerfectScrollbar from 'react-perfect-scrollbar'

function Home() {
  const [preferences, setPreferences] = useRecoilState(preferencesState)

  return (
    <div className={`flex rounded-md min-w-[25rem]
    ${preferences.home === "solarized" ? getGradient() :
        preferences.home === "accent" ? "bg-gradient-to-b from-[--gradient-color] to-[--background-elevated-base] to-50%" : null}`
    }
      style={{ backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)" }}
    >

      <PerfectScrollbar className={`relative  ${preferences.home === 'neutral' && preferences.theme === 'light' || preferences.home === 'accent' ? 'backdrop-brightness-90' : 'backdrop-brightness-100'} w-full rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide`}>
        <div className="text-[--home-text-light] ms-5 mt-14 space-y-6">
          <h1 className="text-3xl mb-6 font-bold">{greeting()}</h1>
          <UserTopItems />
        </div>
        <div className="text-[--home-text-light] ms-5 mt-4 space-y-6 ">
          <UserTopArtists />
          <UserAlbums />
          <RelatedArtists />
          <FeaturedPlaylists />
          <CategoryPlaylists category={'chill'} title={'Chill vibes'} />
          <CategoryPlaylists category={'gaming'} title={'Made for gamers'} />
          <CategoryPlaylists category={'country'} title={'Hot country'} />


        </div>
        <hr className="border-neutral-500 opacity-20 mt-5 pb-4 mx-6" />
        <div className="flex justify-end mx-6 mb-20 text-sm text-[--home-text-light] ">
          <p>Music Data © 2023 Spotify AB</p>

        </div>

      </PerfectScrollbar>

    </div>

  )
}

export default Home