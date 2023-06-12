import Sidebar from "../components/sidebar"
import Center from "../components/center"
import { getSession } from "next-auth/react"
import Player from "@/components/player"
import User from "@/components/user"

export const metadata = {
  title: 'test',
  description: 'test',
}

export default function Home() {
  return (
    <main className="bg-black h-screen overflow-hidden">
      <User />
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </div>
      <div className="bottom-0 fixed left-0 w-full">
        {/* Player */}
        <Player />
      </div> 
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session
    },
  }
}
