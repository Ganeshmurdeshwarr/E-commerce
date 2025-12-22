import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"

const TopBar = () => {
  return (
    <div className='bg-[#ea2e0e] text-black'  >
        <div className='container mx-auto flex justify-center items-center py-3 px-4'>
            <div className='hidden md:flex items-center gap-x-3'>
                <a href="#"  className=' hover:text-gray-300'>
                    <TbBrandMeta  className=" h-5 w-5"/>
                </a>
                <a href="#"  className=' hover:text-gray-300'>
                    <IoLogoInstagram  className=" h-5 w-5"/>
                </a>
                <a href="#"  className=' hover:text-gray-300'>
                    <RiTwitterXLine  className=" h-5 w-5"/>
                </a>
            </div>
            <div className='text-sm text-center grow'>
                <span>We ship worldwide -Fast and reliable shipping!</span>
            </div>
            <div className='hidden md:block text-sm '>
                <a href="tel:+919743761013" className='hover:text-gray-300'>
                    +91 9743761013
                    </a>
            </div>
        </div>
    </div>
  )
}

export default TopBar