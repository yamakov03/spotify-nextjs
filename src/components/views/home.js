import { useEffect } from "react"
import { getGradient, greeting } from "../../lib/time"
import { useSession } from "next-auth/react";
import { preferencesState } from "../../atoms/userAtom";
import { useRecoilState } from "recoil";

import UserTopArtists from "../home/userTopArtists"
import UserTopItems from "../home/userTopItems";
import FeaturedPlaylists from "../home/featuredPlaylists";
import TopPlaylists from "../home/topPlaylists";
import UserAlbums from "../home/userAlbums";
import RelatedArtists from "../home/relatedArtists";
import CategoryPlaylists from "../home/categoryPlaylists";

function Home() {
  const [preferences, setPreferences] = useRecoilState(preferencesState)
  const { data: session } = useSession();

  return (
    <div className={`flex rounded-md
    ${preferences.home === "solarized" ? getGradient()  + " bg-opacity-0" : 
    preferences.home === "accent" ? "bg-gradient-to-b from-[--gradient-color] to-[--background-elevated-base] to-50%" : null}`
    }
    style={{backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)"}}
    >

      <div className={`bg-black ${preferences.home === 'neutral' && preferences.theme === 'light' || preferences.home === 'accent' ? 'bg-opacity-20' : 'bg-opacity-0'} w-full rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide`}>
        <div className="text-[--home-text-light] ms-4 mt-14 space-y-5 ">

          <h1 className="text-3xl mb-5 font-bold">{greeting()}</h1>
          <UserTopItems />
          <UserTopArtists />
          <UserAlbums />
          <RelatedArtists />
          <FeaturedPlaylists />
          <CategoryPlaylists category={'gaming'} title={'Made for gamers'} />

        </div>
        
      </div>

    </div>

  )
}

export default Home