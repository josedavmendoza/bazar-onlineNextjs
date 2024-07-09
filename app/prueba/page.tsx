'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BazarIcon from '../ui/BazarIcon'

export default function Prueba() {
 const router = useRouter()
 const [searchTerm, setSearchTerm] = useState('')
 const handleSearch = () => {
  router.push(`http://localhost:3000/results?search=${searchTerm}`)
 }
 return (
  <div className="flex h-screen w-full flex-col items-center justify-center">
   <BazarIcon width={150} height={150} />
   <h1 className="mb-[15px] mt-[15px] text-4xl font-extrabold">Bazar Online</h1>
   <form action={handleSearch}>
    <div className="mb-[15px] flex h-[50px] w-[310px] items-center justify-evenly rounded bg-gray-200 shadow">
     <input
      className="bg-gray-200 text-xl outline-none"
      type="text"
      value={searchTerm}
      placeholder="laptops,smartphones,tablets... "
      onChange={(e) => setSearchTerm(e.target.value)}
      required
     />
     <svg
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
    <div className="flex justify-center">
     <button
      type="submit"
      className={`mb-[40px] mt-[10px] h-[40px] w-[170px] rounded-full bg-red-600 text-2xl shadow`}
     >
      Search
     </button>
    </div>
   </form>
  </div>
 )
}
