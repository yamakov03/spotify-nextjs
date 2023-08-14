import Playlist from "../components/views/playlist"
import { getSession } from "next-auth/react"
import Player from "../components/player"
import User from "../components/user"
import { useRecoilState } from "recoil"
import { currentViewState } from "../atoms/viewAtom"
import { isLoadingState } from "../atoms/isLoadingAtom"
import Search from "../components/views/search"
import Library from "../components/views/library"
import Home from "../components/views/home"
import Loading from "../components/views/loading"
import LikedSongs from "../components/views/likedSongs"

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
      {view === "playlist" ? <Playlist /> : null}
      {view === "search" ? <Search /> : null}
      {view === "library" ? <Library /> : null}
      {view === "likedsongs" ? <LikedSongs /> : null}
      {isLoading ? <Loading /> : null}
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
