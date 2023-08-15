import React from 'react'
import { randomHSLA } from '../../lib/colors'
import Image from 'next/image'

function BrowseCard({ image, title }) {

  return (
    <div id='browseCard' className={`flex-col text-white rounded-md h-full w-full flex-shrink-0 overflow-hidden hover:scale-[1.05] transition-all duration-200 cursor-pointer`} style={{ background: randomHSLA() }}>
      <div>
        <p className='text-2xl p-4 font-semibold mb-[150px] truncate'>{title}</p>
      </div>
      <div className='relative'>

        <Image className=' absolute rounded-xl right-[-25px] bottom-[-10px] w-32 h-32 rotate-[24deg] shadow-lg shadow-black/20' src={image} width={128} height={128} />
      </div>

    </div>
  )
}

export default BrowseCard