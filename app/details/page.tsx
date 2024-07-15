'use client'
import { useSearchParams } from 'next/navigation'
import BazarIcon from '../ui/BazarIcon'
import Button from '../ui/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StarRating from '../ui/StarRating'

interface Product {
 id: number
 title: string
 description: string
 price: string
 discounPercentage: number
 rating: number
 stock: number
 brand: string
 thumbnail: string
 images: string[]
}

export default function Details() {
 const searchParams = useSearchParams()
 const param = searchParams.get('id')
 const router = useRouter()

 const [productData, setProductData] = useState<Product | null>(null)
 const [isLoading, setLoading] = useState(false)
 const [error, setError] = useState(null)
 const sendTerm = (formData: any) => {
  const term = formData.get('term')
  router.push(`/results?search=${term}`)
 }

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   setError(null)

   try {
    const response = await fetch(`/api/${param}`)

    if (!response.ok) {
     throw new Error(`API request failed with status${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    setProductData(data.data)
   } catch (err) {
    setError(null)
   } finally {
    setLoading(false)
   }
  }
  if (param) {
   fetchData()
  }
 }, [param])

 if (isLoading) {
  return console.log('Loading...')
 }

 if (error) {
  return console.log('ERROR')
 }

 if (!productData) {
  return console.log('Product not found')
 }

 const {
  id,
  title,
  description,
  price,
  discounPercentage,
  rating,
  stock,
  brand,
  thumbnail,
  images,
 } = productData

 return (
  <div>
   <header className="mt-[10px] flex h-[85px] items-center justify-evenly ">
    <BazarIcon height={80} width={65} />
    <div className="mt-[20px]">
     <form
      action={sendTerm}
      className="mb-[15px] flex h-[40px] w-[228px] items-center justify-around rounded bg-gray-200 shadow"
     >
      <input
       className="max-w-[150px] bg-gray-200 text-base outline-none"
       type="text"
       name="term"
       placeholder="Search"
       required
      />
      <button type="submit">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={800}
        fill="none"
        viewBox="0 0 24 24"
       >
        <g stroke="#333" strokeWidth={1.8}>
         <path d="M19.96 11.48a8.45 8.45 0 0 1-2.458 5.971 8.438 8.438 0 0 1-6.022 2.51 8.48 8.48 0 1 1 8.48-8.48Z" />
         <path strokeLinecap="round" d="m18.155 18.155 3.732 3.732" />
        </g>
       </svg>
      </button>
     </form>
    </div>
   </header>
   <>
    <div className="flex items-center justify-evenly ">
     <img
      className="h-[180px] w-[180px] rounded-full"
      src={thumbnail}
      alt={title}
     />
     <div className=" flex-wrap">
      {images.map((imageURL) => (
       <img
        className="flex h-[75px] w-[75px] rounded-full"
        src={imageURL}
        alt={title}
        key={imageURL}
       />
      ))}
     </div>
    </div>
    <section className="flex-wrap items-center justify-center ">
     <h1 className="mb-[10px] mt-[15px] text-center text-[24px] font-black">
      {title}
     </h1>
     <div className="flex items-center justify-center">
      <div className="mr-[30px]">
       <h2 className="text-center font-sans text-2xl font-black">{price}</h2>
       <span className="text-[15px] font-black">{stock} Available</span>
      </div>
      <StarRating ratingProduct={rating} size={22} />
     </div>
     <p className="mx-auto mt-[20px] w-[294px] text-[15px]">{description}</p>
    </section>
    <Button name="Buy" measures="h-[60px] w-[250px]" fontSize="text-4xl" />
   </>
  </div>
 )
}
