
import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode } from 'react'
import User from "../components/user"
import Player from '../components/player';
import Sidebar from '../components/sidebar';

const MainLayout = (props) => {
    return (
        <main className="bg-[--background-press] h-screen scrollbar-hide ">

            <User />
            <div className='flex'>
                {/* Sidebar */}
                <Sidebar />
                {/* Center */}
                <div className="divider" />
                {props.children}
            </div>
            <div className="bottom-0 fixed left-0 w-full">
                {/* Player */}
                <Player />
            </div>
        </main>
    )
}

export default MainLayout;