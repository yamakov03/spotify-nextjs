import Sidebar from "../components/sidebar"
import PlaylistView from "../components/views/playlist"
import { getSession } from "next-auth/react"
import Player from "@/components/player"
import User from "@/components/user"
import { useRecoilState } from "recoil"
import { currentViewState } from "@/atoms/viewAtom"
import HomeView from "@/components/views/home"
import { isLoadingState } from "@/atoms/isLoadingAtom"

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
      {view === "home" ? <HomeView /> : null}
      {view === "playlist" ? <PlaylistView />: null}``
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
