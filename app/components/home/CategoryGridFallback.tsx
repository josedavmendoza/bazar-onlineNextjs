import React from 'react'

const CategoryGridFallback = () => {
 return (
  <div className="flex animate-pulse cursor-pointer flex-col justify-between shadow md:h-[445px] md:w-[346px] md:bg-gray-100 md:[border-radius:6px]">
   <div className="h-[18px] w-[100px] rounded bg-gray-300 md:my-[16px] md:ml-[20px]"></div>
   <div className="mx-auto h-[285px] w-[285px] rounded bg-gray-300"></div>
   <div className="flex w-[345px] md:my-[13px] md:items-center md:justify-evenly">
    {Array.from({ length: 4 }).map((_, index) => (
     <div
      key={index}
      className="md:flex md:h-[65px] md:w-[65px] md:rounded md:border md:border-gray-300 md:bg-gray-300"
     ></div>
    ))}
   </div>
  </div>
 )
}

export default CategoryGridFallback
