import React from 'react'
import { getPrimaryColor, randomHSLA } from '../../lib/colors'

function BrowseCard({ image, title }) {

  return (
    <div id='browseCard' className={`flex-col rounded-md h-full w-full flex-shrink-0 overflow-hidden hover:scale-[1.05] transition-all duration-200 cursor-pointer`} style={{ background: randomHSLA() }}>
      <div>
        <p className='text-2xl p-4 font-semibold mb-[150px] truncate'>{title}</p>
      </div>
      <div className='relative'>
        <img className=' absolute right-[-25px] bottom-[-10px] w-32 h-32 rotate-[24deg] shadow-lg shadow-black/20' src={image} />
      </div>

    </div>
  )
}

export default BrowseCard