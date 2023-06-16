
import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode } from 'react'
import User from "../components/user"
import Player from '../components/player';
import Sidebar from '../components/sidebar';

const MainLayout = (props) => {
    return (
        <main className="bg-black h-screen">
            <User />
            <div className='flex'>
                {/* Sidebar */}
                <Sidebar />
                <div id="resizer"></div>
                {/* Center */}
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