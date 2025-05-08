// components/fallbacks/SearchResultsListFallback.tsx
import React from 'react'

const SearchResultsListFallback = () => {
 return (
  <div className="ml-[9px] md:mt-[39px] md:grid md:h-full md:w-[744px] md:grid-cols-3 md:gap-[16px]">
   {Array.from({ length: 9 }).map((_, index) => (
    <div
     key={index}
     className="h-[427.85px] w-[240px] animate-pulse rounded-md bg-white"
    ></div>
   ))}
  </div>
 )
}

export default SearchResultsListFallback
