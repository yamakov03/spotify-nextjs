import { signOut, useSession } from "next-auth/react";
import {useEffect, useState } from "react";
import { IoBrush, IoChevronDown, IoSettings } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { CirclePicker, SliderPicker} from "react-color";
import { lumaHex} from "../lib/colors";
import { useClickAway } from "@uidotdev/usehooks";
import { preferencesState } from "../atoms/userAtom";
import { useCookies } from 'react-cookie';
import { getGradient, getHours } from "../lib/time";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import {LeftArrowMenu, RightArrowMenu } from "./shared/horizontalScrollIcons";
import PerfectScrollbar from 'react-perfect-scrollbar';
function User() {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // const [preferences, setPreferences] = useState({
    //     theme: 'dark',
    //     accent: '#282828',
    //     home: 'accent'
    // });
    const [preferences, setPreferences] = useRecoilState(preferencesState);
    const [cookies, setCookie, removeCookie] = useCookies(['preferencesCookie']);
    const [color, setColor] = useState(cookies.preferencesCookie?.homeColor ? cookies.preferencesCookie.homeColor : '#282828');


    useEffect(() => {
        if (color) {
            document.documentElement.style.setProperty('--background-base', color);
        }
    }, [color])

    useEffect(() => {
        setCookie('preferencesCookie', preferences, { path: '/' });
    }, [preferences])

    useEffect(() => {
        if (cookies.preferencesCookie) {
            setPreferences(cookies.preferencesCookie)
        }
    }, [])


    useEffect(() => {
        if (preferences.theme === "light") {
            document.documentElement.style.setProperty('--background-press', '#fff');
            document.documentElement.style.setProperty('--ui-text-subdued', '#606060');
            document.documentElement.style.setProperty('--ui-text-light', '#181818e6');
            document.documentElement.style.setProperty('--background-elevated-press', '#fff');
            document.documentElement.style.setProperty('--background-elevated-base', '#e9e9e9')
            document.documentElement.style.setProperty('--background-base', '#e9e9e9');

            if (preferences.sidebar === 'neutral') {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#606060');
                document.documentElement.style.setProperty('--sidebar-text-light', '#181818e6');
                document.documentElement.style.setProperty('--text-highlight', '#777777');
            }
            if (preferences.home === 'neutral') {
                document.documentElement.style.setProperty('--home-text-subdued', '#606060');
                document.documentElement.style.setProperty('--home-text-light', '#181818e6');
            }

        } else if (preferences.theme === "dark") {
            document.documentElement.style.setProperty('--background-press', '#000');
            document.documentElement.style.setProperty('--text-subdued', '#a7a7a7');
            document.documentElement.style.setProperty('--text-light', '#FFFFFFE6');
            document.documentElement.style.setProperty('--ui-text-subdued', '#a7a7a7');
            document.documentElement.style.setProperty('--ui-text-light', '#FFFFFFE6');

            if (preferences.sidebar === 'neutral') {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--sidebar-text-light', '#FFFFFFE6');
                document.documentElement.style.setProperty('--text-highlight', '#fff');
            }
            if (preferences.home === 'neutral') {
                document.documentElement.style.setProperty('--home-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--home-text-light', '#FFFFFFE6');
            }
            document.documentElement.style.setProperty('--background-elevated-press', '#282828');
            document.documentElement.style.setProperty('--background-elevated-base', '#121212');
            document.documentElement.style.setProperty('--background-base', '#121212');
        }
        document.documentElement.style.setProperty('--background-base', color);
    }, [preferences.home, preferences.theme])

    useEffect(() => {
        if (preferences.home === 'flat') {
            if (lumaHex(color) < 210) {
                document.documentElement.style.setProperty('--home-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--home-text-light', '#FFFFFFE6');
            } else {
                document.documentElement.style.setProperty('--home-text-subdued', '#606060');
                document.documentElement.style.setProperty('--home-text-light', '#181818e6');
            }
        }
        else if (preferences.home === 'accent') {
            if (lumaHex(color) < 160) {
                document.documentElement.style.setProperty('--home-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--home-text-light', '#FFFFFFE6');
            } else {
                if (preferences.theme === 'light') {
                    document.documentElement.style.setProperty('--home-text-subdued', '#606060');
                    document.documentElement.style.setProperty('--home-text-light', '#181818e6');
                } else {
                    document.documentElement.style.setProperty('--home-text-subdued', '#a7a7a7');
                    document.documentElement.style.setProperty('--home-text-light', '#FFFFFFE6');
                }
            }
            document.documentElement.style.setProperty('--gradient-color', color);

        }
        else if (preferences.home === 'solarized') {
            if (getHours() > 14 || getHours() < 6) {
                document.documentElement.style.setProperty('--home-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--home-text-light', '#FFFFFFE6');
            } else {
                document.documentElement.style.setProperty('--home-text-subdued', '#606060');
                document.documentElement.style.setProperty('--home-text-light', '#181818e6');
            }
        }
    }, [preferences.homeColor, preferences.home])

    useEffect(() => {
        if (preferences.sidebar === 'solarized') {
            if (getHours() > 14 || getHours() < 6) {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#b7b7b7');
                document.documentElement.style.setProperty('--sidebar-text-light', '#FFFFFFE6');
            } else {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#606060');
                document.documentElement.style.setProperty('--sidebar-text-light', '#181818e6');
            }
            if (preferences.theme === 'light') {
                document.documentElement.style.setProperty('--text-highlight', '#777777');
            } else {
                document.documentElement.style.setProperty('--text-highlight', '#fff');
            }

        }
        if (preferences.sidebar === 'neutral') {
            if (preferences.theme === 'dark') {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--sidebar-text-light', '#FFFFFFE6');
            } else {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#606060');
                document.documentElement.style.setProperty('--sidebar-text-light', '#181818e6');
            }
        } else if (preferences.sidebar === 'flat') {
            if (lumaHex(preferences.sidebarColor) < 130) {
                document.documentElement.style.setProperty('--sidebar-text-subdued', '#a7a7a7');
                document.documentElement.style.setProperty('--sidebar-text-light', '#FFFFFFE6');
                document.documentElement.style.setProperty('--text-highlight', '#fff');
            } else {

                document.documentElement.style.setProperty('--sidebar-text-subdued', '#606060');
                document.documentElement.style.setProperty('--sidebar-text-light', '#181818e6');
                document.documentElement.style.setProperty('--text-highlight', '#aaa');
            }
        }
    }, [preferences.sidebar, preferences.sidebarColor])

    const settingsRef = useClickAway((e) => {
        const clickedNavButton = e.target.classList.contains("settings");
        if (!clickedNavButton) {
            setShowSettings(false);
        }
    });

    const dropdownRef = useClickAway((e) => {
        const clickedNavButton = e.target.classList.contains("dropdown");
        if (!clickedNavButton) {
            setShowDropdown(false);
        }
    });

    const handleOpenSettings = () => {
        setShowDropdown(false);
        setShowSettings(!showSettings);
    };

    const handleOpenDropdown = () => {
        setShowSettings(false);
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="fixed top-7 right-8 flex z-50">
            <div onClick={handleOpenDropdown}
                className="dropdown flex items-center bg-neutral-700 space-x-2 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                type="button"
                aria-hidden="true"
            >
                <img
                    src={session?.user.image}
                    alt=""
                    className="dropdown rounded-full w-7 h-7"
                />
                <p className="dropdown">{session?.user.name}</p>
                <IoChevronDown className="dropdown h-5 w-5" />
            </div>
            <div className="settings rounded-full bg-neutral-700 flex opacity-90 hover:opacity-80  items-center align-middle ms-3 cursor-pointer" onClick={handleOpenSettings}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="settings h-5 w-5 text-white mx-2" viewBox="0 0 20 20" fill="currentColor">
                    <path className="settings" fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg> */}
                <IoBrush className="settings h-5 w-5 text-white mx-2" />
            </div>

            {showDropdown && (
                <div ref={dropdownRef} className="absolute inline-block text-left right-0 mt-10 shadow-lg rounded-md shadow-black/200">
                    <div className="text-[--ui-text-light] bg-[--background-elevated-press] z-10 mt-2 w-48 rounded-[5px] focus:outline-none" >
                        <div className="py-1 px-1 " >
                            <div className="flex cursor-pointer items-center px-2 justify-between hover:bg-[--background-tinted-constant] rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Account</a>
                                <svg role="img" height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <a href="#" className="block cursor-pointer py-2 text-sm px-2 hover:bg-[--background-tinted-constant] rounded-sm" role="menuitem" >Profile</a>
                            <div className="flex cursor-pointer items-center justify-between  px-2 hover:bg-[--background-tinted-constant] rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Support</a>
                                <svg role="img" height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <div className="flex cursor-pointer items-center justify-between  px-2 hover:bg-[--background-tinted-constant] rounded-sm">
                                <a href="#" className="block py-2 text-sm justify-start" role="menuitem">Download</a>
                                <svg role="img" height="16" width="16" aria-hidden="true" aria-label="External link" viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 haNxPq" fill="currentColor"><path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75V2.75z" fill="currentColor"></path><path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5H15z" fill="currentColor"></path></svg>
                            </div>
                            <a href="#" className="cursor-pointer block py-2 text-sm px-2 hover:bg-[--background-tinted-constant] rounded-sm" role="menuitem" id="menu-item-2">Settings</a>
                            <hr className="border-neutral-500 opacity-20" />
                            <a onClick={() => signOut()} className="cursor-pointer block py-2 text-sm px-2 hover:bg-[--background-tinted-constant] rounded-sm" role="menuitem" id="menu-item-2">Log out</a>
                        </div>
                    </div>
                </div>
            )}
            {showSettings && (
                <div ref={settingsRef} className="absolute text-left right-0 mt-10 shadow-lg shadow-black/200 rounded-md" >
                    <PerfectScrollbar className="text-[--ui-text-light] bg-[--background-elevated-press] py-4 z-10 mt-2 w-[320px] rounded-[5px] shadow-xl focus:outline-none px-4 overflow-y-scroll max-h-[calc(100vh-5rem)] scrollbar-hide" >
                        <h1 className="font-bold text-lg mb-4">Appearance</h1>

                        <p className="block text-md justify-start font-semibold" role="menuitem">Theme</p>
                        <p className="block text-sm justify-start mb-2 text-[#909090]" role="menuitem">Customize your UI theme</p>
                        <div className="flex flex-row space-x-1 overflow-x-scroll scrollbar-hide overflow-auto whitespace-nowrap mb-2">
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.theme === "dark" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, theme: "dark" })}>
                                <div className={`bg-neutral-600 w-[110px] h-[80px] rounded-md group-hover:opacity-70 transition ease-in-out duration-200`}>
                                </div>
                                <p className="text-sm mt-1">Dark</p>
                            </div>
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.theme === "light" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, theme: "light" })}>
                                <div className="bg-neutral-200 border-[1px] border-neutral-300 w-[110px] h-[80px] rounded-md group-hover:opacity-70 transition ease-in-out duration-200">
                                </div>
                                <p className="text-sm mt-1">Light</p>
                            </div>

                        </div>
                        <hr className="border-neutral-500 opacity-20 pb-4" />
                        <p className="block text-md justify-start font-semibold" role="menuitem">Accent</p>
                        <p className="block text-sm justify-start mb-2 text-[#909090]" role="menuitem">Choose your accent color</p>

                        <div className="rounded-md py-4 px-4 mb-2 bg-[--settings-highlight]" >
                            <SliderPicker
                                color={color === "#121212" ? "#c2e5b3" : color}

                                onChange={e => {
                                    setColor(e.hex);
                                }}
                            />
                            <CirclePicker className="mt-4" colors={['#ffffff', '#282828', '#121212', '#000000', '#1ed760']}
                                onChange={e => { setColor(e.hex); }} />
                        </div>
                        <hr className="border-neutral-500 opacity-20 pb-4" />
                        <p className="block text-md justify-start font-semibold" role="menuitem">Home</p>
                        <p className="block text-sm justify-start mb-2 text-[#909090]" role="menuitem">Set your home theme</p>
                        <ScrollMenu LeftArrow={LeftArrowMenu} RightArrow={RightArrowMenu} className="flex flex-row space-x-1 overflow-x-scroll scrollbar-hide overflow-auto whitespace-nowrap mb-2">
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.home === "flat" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, homeColor: color, home: "flat" })}>
                                <div className={`bg-[--background-base] w-[110px] h-[80px] rounded-md group-hover:opacity-80 transition ease-in-out duration-200`}>
                                    <div className="w-full h-full rounded-md bg-black bg-opacity-10"></div>
                                </div>
                                <p className="text-sm mt-1">Flat</p>
                            </div>
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.home === "accent" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, homeColor: color, home: "accent" })}>
                                <div className={`from-[--background-base] to-[--background-press] bg-gradient-to-b w-[110px] h-[80px] rounded-md group-hover:opacity-80 transition ease-in-out duration-200`}>
                                    <div className="w-full h-full rounded-md bg-black bg-opacity-10"></div>
                                </div>
                                <p className="text-sm mt-1">Accent</p>
                            </div>
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.home === "solarized" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, home: "solarized" })}>
                                <div className={`${getGradient()} w-[110px] h-[80px] rounded-md group-hover:opacity-80 transition ease-in-out duration-200`}>
                                </div>

                                <p className="text-sm mt-1">Solarized</p>
                            </div>

                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.home === "neutral" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, home: "neutral" })}>
                                <div className="bg-neutral-200 border-[1px] border-neutral-300 w-[110px] h-[80px] rounded-md group-hover:opacity-70 transition ease-in-out duration-200">
                                    <div className="w-full h-full rounded-md bg-black bg-opacity-10"></div>
                                </div>
                                <p className="text-sm mt-1">Neutral</p>
                            </div>
                        </ScrollMenu>
                        <hr className="border-neutral-500 opacity-20 pb-4 mt-2" />
                        <p className="block text-md justify-start font-semibold" role="menuitem">Sidebar</p>
                        <p className="block text-sm justify-start mb-2 text-[#909090]" role="menuitem">Set your sidebar theme</p>
                        <div className="flex flex-row\ space-x-1 overflow-x-scroll scrollbar-hide overflow-auto whitespace-nowrap">
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.sidebar === "flat" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, sidebarColor: color, sidebar: "flat" })}>
                                <div className={`bg-[--background-base] w-[50px] h-[80px] rounded-md group-hover:opacity-80 transition ease-in-out duration-200`}>
                                </div>
                                <p className="text-sm mt-1">Flat</p>
                            </div>
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.sidebar === "solarized" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, sidebar: "solarized" })}>
                                <div id='solarizedGradient' className={`${getGradient()} w-[50px] h-[80px] rounded-md group-hover:opacity-80 transition ease-in-out duration-200`}>
                                </div>
                                <p className="text-sm mt-1">Solarized</p>
                            </div>
                            <div className={`cursor-pointer group rounded-md p-2 ${preferences.sidebar === "neutral" ? "bg-[--settings-highlight]" : null}`} onClick={() => setPreferences({ ...preferences, sidebar: "neutral" })}>
                                <div className="bg-neutral-200 border-[1px] border-neutral-300 w-[50px] h-[80px] rounded-md group-hover:opacity-70 transition ease-in-out duration-200">
                                </div>
                                <p className="text-sm mt-1">Neutral</p>
                            </div>

                        </div>

                    </PerfectScrollbar>
                </div>
            )}
        </header>
    )
}

export default User