'use client'
import { useSearchParams } from 'next/navigation'
import BazarIcon from '../ui/BazarIcon'
import Button from '../ui/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StarRating from '../ui/StarRating'
import Slider from 'react-slick'
import Image from 'next/image'
import '../slick.css'
import './slick-theme.css'
import { CgClose } from 'react-icons/cg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

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
 image: string
}

export default function Details() {
 const searchParams = useSearchParams()
 const param = searchParams.get('id')
 const router = useRouter()

 const [productData, setProductData] = useState<Product | null>(null)
 const [isLoading, setLoading] = useState(false)
 const [error, setError] = useState(null)
 const [isFullScreen, setIsFullscreen] = useState(false)
 const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
     throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    setProductData(data.data)
   } catch (err) {
    console.log(err)
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
  image,
 } = productData

 const handleOpenFullScreen = (index: number) => {
  setIsFullscreen(true)
  setCurrentImageIndex(index)
 }

 const handleCloseFullscreen = () => {
  setIsFullscreen(false)
 }

 const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <IoIosArrowBack />,
  nextArrow: <IoIosArrowForward />,
 }

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
   <div className="flex items-center justify-evenly ">
    <Image
     className="cursor-pointer rounded-full"
     height={180}
     width={180}
     src={thumbnail || image}
     alt={title}
     onClick={() => handleOpenFullScreen(0)}
    />
    <div className=" flex-wrap">
     {images.map((imageURL) => (
      <Image
       className="flex cursor-pointer rounded-full"
       height={75}
       width={75}
       src={imageURL}
       alt={title}
       key={imageURL}
       onClick={() => handleOpenFullScreen(0)}
      />
     ))}
    </div>
   </div>
   {isFullScreen && (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-75">
     <button
      onClick={handleCloseFullscreen}
      className="fixed right-[20px] top-[20px] z-[51] bg-black bg-opacity-35"
     >
      <CgClose className="h-[40px] w-[40px] text-white" />
     </button>
     <Slider {...settings}>
      {images.map((imageURL, index) => (
       <div className="mt-[100px]" key={index}>
        <Image
         className="h-[360px] w-[auto] md:h-[700px]"
         height={600}
         width={600}
         src={imageURL}
         alt={title}
        />
       </div>
      ))}
     </Slider>
    </div>
   )}
   <section className="flex-wrap items-center justify-center ">
    <h1 className="mb-[10px] mt-[15px] text-center text-[24px] font-black">
     {title}
    </h1>
    <div className="flex items-center justify-center">
     <div className="mr-[30px]">
      <h2 className="text-center font-sans text-2xl font-black">{price}$</h2>
      <span className="text-[15px] font-black">{stock} Available</span>
     </div>
     <StarRating ratingProduct={rating} size={22} />
    </div>
    <p className="mx-auto mt-[20px] w-[294px] text-[15px]">{description}</p>
   </section>
   <div className="flex justify-center">
    <button
     className={`mb-[40px] mt-[10px] h-[60px] w-[250px] rounded-full bg-[#ee6c4d] text-4xl font-medium shadow`}
    >
     Buy
    </button>
   </div>
  </div>
 )
}
