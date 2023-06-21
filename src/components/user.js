import { CogIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoSettings } from "react-icons/io5";

function User() {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (

        <header className="absolute top-5 right-8 flex">
            <div onClick={() => {setShowDropdown(!showDropdown); setShowSettings(false)}}
                className="flex items-center bg-neutral-800 space-x-2 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                type="button"
                aria-hidden="true"
            >
                <img
                    src={session?.user.image}
                    alt=""
                    className="rounded-full w-7 h-7"
                />
                <p className="">{session?.user.name}</p>
                <IoChevronDown className="h-5 w-5" />
            </div>
            <div className="rounded-full bg-neutral-800 flex items-center align-middle ms-3 cursor-pointer" onClick={() => {setShowSettings(!showSettings) ; setShowDropdown(false)}}>
                <CogIcon className="h-5 w-5 mx-2 text-white opacity-90 hover:opacity-80  " />
            </div>

            {showDropdown && (
                <div className="absolute inline-block text-left right-0 mt-10">
                    <div className="text-[--text-light] bg-[--background-elevated-base] z-10 mt-2 w-48 rounded-[5px] shadow-xl focus:outline-none" >
                        <div className="py-1 px-1 " >
                            <div className="flex cursor-pointer items-center px-2 justify-between hover:bg-neutral-700 rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Account</a>
                                <svg role="img" height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16"  className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <a href="#" className="block cursor-pointer py-2 text-sm px-2 hover:bg-neutral-700 rounded-sm" role="menuitem" >Profile</a>
                            <div className="flex cursor-pointer items-center justify-between  px-2 hover:bg-neutral-700 rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Support</a>
                                <svg role="img"  height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <div className="flex cursor-pointer items-center justify-between  px-2 hover:bg-neutral-700 rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Download</a>
                                <svg role="img" height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <a href="#" className="cursor-pointer block py-2 text-sm px-2 hover:bg-neutral-700 rounded-sm" role="menuitem" id="menu-item-2">Settings</a>
                            <hr className="border-neutral-700" />
                            <a onClick={() => signOut()} className="cursor-pointer block py-2 text-sm px-2 hover:bg-neutral-700 rounded-sm" role="menuitem" id="menu-item-2">Log out</a>
                        </div>
                    </div>
                </div>
            )}
            {showSettings && (
                <div className="absolute inline-block text-left right-0 mt-10" >
                    <div className="text-[--text-light] bg-[--background-elevated-base] z-10 mt-2 w-48 rounded-[5px] shadow-xl focus:outline-none" >
                        <div className="py-1 px-1 " >
                            settings
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default User