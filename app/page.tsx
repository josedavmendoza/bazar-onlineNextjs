'use client'
import BazarIcon from './ui/BazarIcon'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
import './slick.css'
import './slick-theme.css'

export default function Home() {
 const [searchTerm, setSearchTerm] = useState('')
 const router = useRouter()

 const handleSearch = () => {
  router.push(`/results?search=${searchTerm}`)
 }

 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
 }

 return (
  <main>
   <nav className="mt-[120px] flex flex-col items-center md:mt-0 md:block md:h-[120px] md:bg-[#98c1d9] ">
    <div className="flex flex-col items-center md:ml-[10px] md:inline-flex md:h-[120px] md:w-[120px] md:flex-wrap md:items-center md:justify-center">
     <BazarIcon className="md:h-[80px] md:w-[70px]" width={150} height={150} />
     <h1 className="mb-[15px] mt-[15px] text-4xl font-extrabold md:my-0  md:text-lg">
      Bazar Online
     </h1>
    </div>
    <form
     className="flex flex-col items-center md:absolute md:left-[220px] md:top-[12px] md:inline-block"
     action={handleSearch}
    >
     <div className="mb-[15px] flex h-[50px] w-[310px] items-center justify-evenly rounded bg-gray-200 shadow md:mb-0 md:inline-flex md:w-[506.89px] md:justify-normal">
      <input
       className=" max-w-[506px] bg-gray-200 text-[18px] outline-none md:ml-[15px] md:w-[450px]"
       type="text"
       value={searchTerm}
       placeholder="Buscar productos, marcas y más... "
       onChange={(e) => setSearchTerm(e.target.value)}
       required
      />
      <svg
       className="md:ml-[5px]"
       xmlns="http://www.w3.org/2000/svg"
       width={25}
       height={25}
       fill="none"
       viewBox="0 0 24 24"
      >
       <g stroke="#333" strokeWidth={1.8}>
        <path d="M19.96 11.48a8.45 8.45 0 0 1-2.458 5.971 8.438 8.438 0 0 1-6.022 2.51 8.48 8.48 0 1 1 8.48-8.48Z" />
        <path strokeLinecap="round" d="m18.155 18.155 3.732 3.732" />
       </g>
      </svg>
     </div>
     <button
      type="submit"
      className="mb-[40px] mt-[10px] h-[40px] w-[170px] rounded-full bg-[#ee6c4d] text-2xl font-medium shadow md:inline-block md:hidden md:w-[135px]"
     >
      Search
     </button>
    </form>
   </nav>
   <div className="hidden">
    <Slider {...settings} className="hidden">
     <div className="mt-[150px] h-[200px] bg-blue-600"></div>
     <div className="h-[200px] bg-red-600"></div>
    </Slider>
   </div>
  </main>
 )
}
