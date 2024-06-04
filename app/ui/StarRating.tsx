'use client'

import { useState } from 'react'
import { IoStarOutline, IoStar } from 'react-icons/io5'

export default function StarRating() {
 const [rating, setRating] = useState<number | null>(null)
 return (
  <div className="flex">
   {[...Array(5)].map((star, index) => {
    const ratingValue = index + 1

    return (
     <label>
      <input
       className="hidden"
       type="radio"
       name="rating"
       value={ratingValue}
       onClick={() => setRating(ratingValue)}
      />
      <IoStar
       className="cursor-pointer"
       color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
       size={25}
      />
     </label>
    )
   })}
  </div>
 )
}
