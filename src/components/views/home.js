import { useEffect } from "react"
import { greeting } from "../../lib/time"
import UserTopArtists from "../home/userTopArtists"
function Home() {

  return (
    <div className={`flex bg-neutral-900 rounded-md g${new Date().getHours()}`} >
      
      <div className="bg-neutral-900 bg-opacity-50 rounded-md h-[calc(100vh-5.5rem)] overflow-y-scroll scrollbar-hide">
      <div className="text-white mx-6 mt-20 ">

          <h1 className="text-4xl mb-5 font-bold">{greeting()}</h1>
      </div>
      <UserTopArtists />

      </div>
      
    </div>

  )
}

export default Home