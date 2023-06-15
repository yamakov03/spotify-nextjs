import Playlist from "../components/views/playlist"
import { getSession } from "next-auth/react"
import Player from "@/src/components/player"
import User from "@/src/components/user"
import { useRecoilState } from "recoil"
import { currentViewState } from "@/src/atoms/viewAtom"
import { isLoadingState } from "@/src/atoms/isLoadingAtom"
import Search from "@/src/components/views/search"
import Library from "@/src/components/views/library"
import Home from "@/src/components/views/home"
import Loading from "@/src/components/views/loading"

export const metadata = {
  title: 'test',
  description: 'test',
}

export default function Index() {
  const [view, setView] = useRecoilState(currentViewState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  return (
    <>
      <header />
      
      {view === "home" ? <Home /> : null}
      {view === "playlist" ? <Playlist />: null}
      {view === "search" ?  <Search/>: null}
      {view === "library" ? <Library />: null}
      {isLoading ? <Loading/> : null}
    </>
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
