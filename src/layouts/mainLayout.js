
import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode } from 'react'
import User from "../components/user"
import Player from '../components/player';
import Sidebar from '../components/sidebar';

const MainLayout = (props) => {
    return (
        <main className="bg-[--background-press] scrollbar-hide ">
            
            <User />
            {/* Sidebar */}
            <Sidebar />
            {/* Center */}
            <div id="main" className='p-2 bg-[--background-press]'>
                  {props.children}
            </div>
            {/* Player */}
            <Player />
        </main>
    )
}

export default MainLayout;