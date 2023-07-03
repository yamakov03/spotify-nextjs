import { SearchIcon } from "@heroicons/react/solid"
import { useState } from "react";
import SearchBarLg from "../search/searchBarLarge";
import BrowseCards from "../search/browseCards";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { preferencesState } from "../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { getGradient } from "../../lib/time";

function Search() {
  const preferences = useRecoilValue(preferencesState);

  return (
    <div className={`flex rounded-md min-w-[36rem] sm:pt-3 pt-14 text-[--home-text-subdued] h-[calc(100vh-5.5rem)]
    ${preferences.home === "solarized" ? getGradient() + " bg-opacity-0" :
        preferences.home === "accent" ? "bg-gradient-to-b from-[--gradient-color] to-[--background-elevated-base] to-50%" : null}`
    }
      style={{ backgroundColor: preferences.home === "flat" ? preferences.homeColor : "var(--background-elevated-base)" }}>

    <PerfectScrollbar className={`px-5 pb-20 ${preferences.home === 'neutral' && preferences.theme === 'light' || preferences.home === 'accent' ? 'bg-opacity-20' : 'bg-opacity-0'} w-full rounded-md overflow-y-scroll scrollbar-hide`}>
        <div className="w-full">
          <SearchBarLg />
          <BrowseCards />

        </div>

      </PerfectScrollbar>
    </div>
  )
}
export default Search