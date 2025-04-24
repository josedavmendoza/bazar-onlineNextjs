'use client'
import { useState } from 'react'
import { IoStar } from 'react-icons/io5'

interface StarRatingProps {
 ratingProduct: number
 className: string
}

export default function StarRating({
 ratingProduct,
 className,
}: StarRatingProps) {
 const [rating, setRating] = useState<number>(ratingProduct)
 return (
  <div className="flex md:inline md:leading-[8px]">
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
       className={className}
       color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
      />
     </label>
    )
   })}
  </div>
 )
}
