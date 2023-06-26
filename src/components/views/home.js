import { useEffect } from "react"
import { greeting } from "../../lib/time"
import UserTopArtists from "../home/userTopArtists"
import { useSession } from "next-auth/react";
import { preferencesState } from "../../atoms/userPreferences";
import { useRecoilState } from "recoil";

function Home() {
  const [preferences, setPreferences] = useRecoilState(preferencesState)
  const { data: session } = useSession();

  return (
    <div className={`flex rounded-md
    ${preferences.home === "solarized" ? "g" + new Date().getHours() + " bg-opacity-0" : 
    preferences.home === "accent" ? "bg-gradient-to-b from-[--background-base] to-[--background-press]" : null}
    `
    }
    style={{backgroundColor: preferences.home === "flat" ? "var(--background-base)" : "var(--background-elevated-base)"}}
    >

      <div className="bg-black bg-opacity-20 w-full transition duration-300 rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide">
        <div className="text-white mx-6 mt-20 ">

          <h1 className="text-4xl mb-5 font-bold">{greeting() + ` ${session?.user.name}`}</h1>
        </div>
        <UserTopArtists />

      </div>

    </div>

  )
}

export default Home