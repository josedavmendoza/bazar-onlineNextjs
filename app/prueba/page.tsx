'use client'
import { useSearchParams } from 'next/navigation'
import BazarIcon from '../ui/BazarIcon'
import Button from '../ui/Button'
import Input from '../ui/Input'
import StarRating from '../ui/StarRating'
import { useEffect, useState } from 'react'

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

 const [productData, setProductData] = useState<Product | null>(null)
 const [isLoading, setLoading] = useState(false)
 const [error, setError] = useState(null)

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   setError(null)

   try {
    const response = await fetch(`http://localhost:3000/api/${param}`)

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
   <header className="mt-[15px] flex h-[100px] items-center justify-evenly">
    <BazarIcon height={80} width={65} />
    <div className="mt-[12px]">
     <Input
      measure={'h-[40px] w-[270px]'}
      lensHeight={25}
      lensWidth={25}
      fontSize="text-base"
     />
    </div>
   </header>
   <>
    <div className="flex items-center justify-evenly">
     <img
      className="h-[210px] w-[210px] rounded-full"
      src={thumbnail}
      alt={title}
     />
     <div className=" flex-wrap">
      {images.map((imageURL) => (
       <img
        className="flex h-[80px] w-[80px] rounded-full"
        src={imageURL}
        alt={title}
        key={imageURL}
       />
      ))}
     </div>
    </div>
    <section className="mb-[60px]  flex-wrap items-center justify-center ">
     <h1 className="mb-[15px] mt-[15px] text-center text-3xl font-extrabold">
      {title}
     </h1>
     <div className="flex items-center justify-center">
      <div className="mr-[30px]">
       <h2 className="text-center font-sans text-2xl font-black">{price}</h2>
       <span>{stock} disponibles</span>
      </div>
      <StarRating />
     </div>
     <p className="mx-auto mt-[40px] w-[320px] ">{description}</p>
    </section>
    <Button name="Comprar" measures="h-[80px] w-[320px]" fontSize="text-4xl" />
   </>
  </div>
 )
}
