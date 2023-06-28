import { useEffect } from "react"
import { getGradient, greeting } from "../../lib/time"
import UserTopArtists from "../home/userTopArtists"
import { useSession } from "next-auth/react";
import { preferencesState } from "../../atoms/userPreferences";
import { useRecoilState } from "recoil";
import UserTopTracks from "../home/userTopTracks";
import UserTopItems from "../home/userTopItems";

function Home() {
  const [preferences, setPreferences] = useRecoilState(preferencesState)
  const { data: session } = useSession();

  return (
    <div className={`flex rounded-md
    ${preferences.home === "solarized" ? getGradient()  + " bg-opacity-0" : 
    preferences.home === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-elevated-base] to-50%" : null}`
    }
    style={{backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)"}}
    >

      <div className={`bg-black ${preferences.home === 'neutral' && preferences.theme === 'light' || preferences.home === 'accent' ? 'bg-opacity-20' : 'bg-opacity-0'} w-full rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide`}>
        <div className="text-white ms-4 mt-20 space-y-4 ">

          <h1 className="text-4xl mb-5 font-semibold">{greeting()}</h1>
          <UserTopItems />
          <UserTopArtists />
          <UserTopTracks />

        </div>
        
      </div>

    </div>

  )
}

export default Home