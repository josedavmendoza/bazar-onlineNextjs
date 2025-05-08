// components/fallbacks/FilterSidebarFallback.tsx
import React from 'react'

const FilterSidebarFallback = () => {
 return (
  <aside className="md:w-[293.99px] md:pr-[29.78px]">
   <div className="mb-4 ml-[10px] mt-[56.5px]">
    <div className="h-6 w-[165px]  animate-pulse rounded bg-gray-400"></div>
    <ul>
     <li className="mt-2">
      <div className="h-4 w-[95px]  animate-pulse rounded bg-gray-400"></div>
     </li>
    </ul>
   </div>
   <div className="mb-[30px] ml-[10px] mt-[23px]">
    <div className="mb-[16px] h-[20px] w-[98px]  animate-pulse rounded bg-gray-400"></div>
    <ul>
     {Array.from({ length: 3 }).map((_, index) => (
      <li key={index} className="mt-2">
       <div className="h-4 w-32  animate-pulse rounded bg-gray-400"></div>
      </li>
     ))}
    </ul>
   </div>
   <div className="mb-4 ml-[10px]">
    <div className="mb-[16px] h-[20px] w-[98px]  animate-pulse rounded bg-gray-400"></div>
    <ul>
     {Array.from({ length: 3 }).map((_, index) => (
      <li key={index} className="mt-2">
       <div className="h-4 w-32  animate-pulse rounded bg-gray-400"></div>
      </li>
     ))}
    </ul>
   </div>
   {/* Puedes añadir más estructuras de fallback según tu sidebar */}
  </aside>
 )
}

export default FilterSidebarFallback
