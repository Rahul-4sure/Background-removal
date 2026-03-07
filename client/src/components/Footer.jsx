import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3'>

      
        <img src={assets.logo} width={150} />
        <p className='flex-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden '>Copyright @GreatStack.dev | All right reserved.</p>
      

      <div className=" flex gap-1">
        <a target="_blank" href="https://www.google.com/">
          <img width={40} src={assets.facebook_icon} alt="" />
        </a>

        <a target="_blank" href="https://www.google.com/">
          <img width={40} src={assets.twitter_icon} alt="" />
        </a>

        <a target="_blank" href="https://www.google.com/">
          <img width={40} src={assets.google_plus_icon} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Footer
