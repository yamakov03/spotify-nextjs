
import dynamic from 'next/dynamic';
import React, { FunctionComponent, ReactNode } from 'react'
import User from "../components/user"
import Player from '../components/player';
import Sidebar from '../components/sidebar';

const MainLayout = (props) => {
    return (
        <>
            <div className="bg-[--background-press] scrollbar-hide">
                <User />
                {/* Sidebar */}
                    <Sidebar />
                    {/* Center */}
                    <div id="main" className='bg-[--background-press] p-2'>
                        {props.children}
                    </div>
                {/* Player */} 
            </div>
            <Player />

        </>
    )
}

export default MainLayout;