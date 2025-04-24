'use client'
import BazarIcon from './components/BazarIcon'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CategorySlider from './components/categorySlider'
import Footer from './components/Footer'
import HomeContainer from './components/HomeContainer'

export default function Home() {
 const [searchTerm, setSearchTerm] = useState('')
 const router = useRouter()

 const handleSearch = () => {
  router.push(`/results?search=${searchTerm}`)
 }

 return (
  <main className="md:h-full md:bg-[rgb(231,231,231)]">
   <nav className="flex justify-center md:h-[100px] md:bg-[#98c1d9]">
    <div className="mt-[120px] md:my-auto md:flex md:h-[80px] md:w-[1070px]">
     <div className="flex flex-col items-center md:block md:h-[80px] md:w-[120px]">
      <BazarIcon
       className="md:mx-auto md:mt-[8px] md:h-[50px] md:w-[50px]"
       width={150}
       height={150}
      />
      <p className="mb-[15px] text-center text-4xl font-extrabold md:my-auto md:h-[24px] md:w-[120px] md:text-nowrap md:text-[14.85px] md:leading-[24px]">
       Pocket Market
      </p>
     </div>
     <form
      className="flex flex-col items-center md:ml-[41px] md:inline-block md:h-[55px]"
      action={handleSearch}
     >
      <div className="mb-[15px] flex h-[50px] w-[310px] items-center justify-evenly rounded bg-gray-200 md:inline-flex md:h-[40px] md:w-[506.89px] md:justify-normal md:bg-white md:shadow">
       <input
        className="w-[255px] bg-gray-200 outline-none md:ml-[15px] md:w-[450px] md:bg-white md:placeholder:text-[14.50px] md:placeholder:font-light md:placeholder:text-slate-500"
        type="text"
        value={searchTerm}
        placeholder="Search products, brands and more... "
        onChange={(e) => setSearchTerm(e.target.value)}
        required
       />
       <svg
        className="md:ml-[5px]"
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={20}
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
       className="mb-[40px] mt-[10px] h-[40px] w-[170px] rounded-full bg-[#ee6c4d] text-2xl font-medium shadow md:hidden md:w-[135px]"
      >
       Search
      </button>
     </form>
    </div>
   </nav>

   <HomeContainer />
   <CategorySlider />
   <Footer />
  </main>
 )
}
