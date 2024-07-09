'use client'
import { useState } from 'react'
import { IoStar } from 'react-icons/io5'

interface StarRatingProps {
 ratingProduct: number
}

export default function StarRating({ ratingProduct }: StarRatingProps) {
 const [rating, setRating] = useState<number>(ratingProduct)
 return (
  <div className="flex">
   {[...Array(5)].map((star, index) => {
    const ratingValue = index + 1

    return (
     <label key={index}>
      <input
       key={index}
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
