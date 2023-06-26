import { useEffect } from "react"
import { getGradient, greeting } from "../../lib/time"
import UserTopArtists from "../home/userTopArtists"
import { useSession } from "next-auth/react";
import { preferencesState } from "../../atoms/userPreferences";
import { useRecoilState } from "recoil";
import UserTopTracks from "../home/userTopTracks";

function Home() {
  const [preferences, setPreferences] = useRecoilState(preferencesState)
  const { data: session } = useSession();

  return (
    <div className={`flex rounded-md
    ${preferences.home === "solarized" ? getGradient()  + " bg-opacity-0" : 
    preferences.home === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-press]" : null}`
    }
    style={{backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)"}}
    >

      <div className={`bg-black ${preferences.home === 'neutral' && preferences.theme === 'light' || preferences.home === 'accent' ? 'bg-opacity-20' : 'bg-opacity-10'} w-full rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide`}>
        <div className="text-white mx-6 mt-20 ">

          <h1 className="text-4xl mb-5 font-bold">{greeting() + ` ${session?.user.name}`}</h1>
        </div>
        <UserTopArtists />
        <UserTopTracks />

      </div>

    </div>

  )
}

export default Home