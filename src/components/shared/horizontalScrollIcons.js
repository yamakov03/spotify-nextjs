import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function LeftArrowCard() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-40 ${isFirstItemVisible ? 'invisible' : 'visible'}`} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer left-[15px] top-[90px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20 '>
          <ArrowLeftIcon onClick={() => scrollPrev()} className=' w-9 h-9 m-1 text-white'/>
        </div>
      </div>
    );
  }
  
export function RightArrowCard() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-40 ${isLastItemVisible ? 'invisible' : 'visible'} `} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer right-[15px] top-[90px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20'>
          <ArrowRightIcon onClick={() => scrollNext()} className=' w-9 h-9 m-1 text-white'/>
        </div>
      </div>
    );
  }

export function LeftArrowMenu() {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-20 ${isFirstItemVisible ? 'invisible' : 'visible'}`} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer left-[5px] top-[35px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20 '>
          <ArrowLeftIcon onClick={() => scrollPrev()} className=' w-6 h-6 m-1 text-white'/>
        </div>
      </div>
    );
  }
  
export function RightArrowMenu() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    return (
      <div className={`relative z-20 ${isLastItemVisible ? 'invisible' : 'visible'} `} >
        <div className='absolute rounded-full bg-neutral-600 cursor-pointer right-[5px] top-[35px] group hover:bg-opacity-80 transition duration-200 shadow-lg shadow-black/20'>
          <ArrowRightIcon onClick={() => scrollNext()} className=' w-6 h-6 m-1 text-white'/>
        </div>
      </div>
    );
  }