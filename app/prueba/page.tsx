'use client'
import BazarIcon from '../ui/BazarIcon'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
import '../slick.css'
import '../slick-theme.css'
import axios from 'axios'

interface Product {
 id: number
 title: string
 thumbnail: string
}

interface Category {
 slug: string
 name: string
 url: string
}

interface CustomSlideProps {
 category: {
  slug: string
  name: string
 }
}

export default function Home() {
 const [searchTerm, setSearchTerm] = useState('')
 const [categories, setCategories] = useState<Category[]>([])
 const [productsByCategory, setProductsByCategory] = useState<{
  [key: string]: Product[]
 }>({})

 const router = useRouter()

 const handleSearch = () => {
  router.push(`/results?search=${searchTerm}`)
 }

 useEffect(() => {
  const fetchCategoriesAndProducts = async () => {
   const response = await axios.get('https://dummyjson.com/products/categories')
   setCategories(response.data)

   const productsByCategoryTemp: { [key: string]: Product[] } = {}

   for (const category of response.data) {
    const productResponse = await axios.get(category.url)
    productsByCategoryTemp[category.slug] = productResponse.data.products
   }

   setProductsByCategory(productsByCategoryTemp)
  }

  fetchCategoriesAndProducts()
 }, [])

 const CustomSlide: React.FC<CustomSlideProps> = ({ category }) => {
  return (
   <div className="mb-[20px] flex h-[97px] w-[248px] items-center border border-gray-300 bg-white [border-radius:6px]">
    {productsByCategory[category.slug]?.[0] && (
     <img
      onClick={() => {
       router.push(`/results?search=${category.slug}`)
      }}
      className="mx-[16px] h-[67px] w-[70px]"
      src={productsByCategory[category.slug][0].thumbnail}
      alt={productsByCategory[category.slug][0].title}
     />
    )}
    <p className="mx-[11px] text-[15px] font-semibold hover:text-sky-500">
     {category.name}
    </p>
   </div>
  )
 }

 const settings = {
  className: 'center',
  centerMode: false,
  infinite: false,
  centerPadding: '100px',
  slidesToShow: 4,
  speed: 500,
  rows: 3,
  slidesPerRow: 1,
 }

 return (
  <main className="md:h-full md:bg-[#e7e7e7]">
   <nav className="flex justify-center md:h-[100px] md:bg-[#98c1d9]">
    <div className="mt-[120px] md:mx-auto md:my-auto md:flex md:h-[80px] md:w-[1070px]">
     <div className="flex flex-col items-center md:block md:h-[80px] md:w-[120px]">
      <BazarIcon
       className="md:mx-auto md:mt-[8px] md:h-[50px] md:w-[50px]"
       width={150}
       height={150}
      />
      <h1 className="mb-[15px] mt-[15px] text-center text-4xl font-extrabold md:my-auto md:text-base">
       Bazar Online
      </h1>
     </div>
     <form
      className="flex flex-col items-center md:ml-[41px] md:inline-block"
      action={handleSearch}
     >
      <div className="mb-[15px] flex h-[50px] w-[310px] items-center justify-evenly rounded bg-gray-200 md:mb-0 md:inline-flex md:h-[40px] md:w-[506.89px] md:justify-normal md:bg-white md:shadow">
       <input
        className=" md:placeholder:inherit max-w-[506px] bg-gray-200 outline-none md:ml-[15px] md:w-[450px] md:bg-white md:placeholder:text-[14.50px] md:placeholder:font-light md:placeholder:text-slate-500"
        type="text"
        value={searchTerm}
        placeholder="Buscar productos, marcas y más... "
        onChange={(e) => setSearchTerm(e.target.value)}
        required
       />
       <svg
        className="md:ml-[5px]"
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={20}
        fill="none"
        viewBox="0 0 24 24"
       >
        <g stroke="#333" strokeWidth={1.8}>
         <path d="M19.96 11.48a8.45 8.45 0 0 1-2.458 5.971 8.438 8.438 0 0 1-6.022 2.51 8.48 8.48 0 1 1 8.48-8.48Z" />
         <path strokeLinecap="round" d="m18.155 18.155 3.732 3.732" />
        </g>
       </svg>
      </div>
      <button
       type="submit"
       className="mb-[40px] mt-[10px] h-[40px] w-[170px] rounded-full bg-[#ee6c4d] text-2xl font-medium shadow md:inline-block md:hidden md:w-[135px]"
      >
       Search
      </button>
     </form>
    </div>
   </nav>
   <div className="hidden md:mx-auto md:my-[42px] md:flex md:w-[1070px] md:justify-between">
    {categories?.slice(3, 6).map((category) => (
     <div
      className="shadow-[theme(boxShadow.card-shadow)] md:h-[445px] md:w-[346px] md:bg-white md:[border-radius:6px]"
      key={category.slug}
     >
      <h2 className="md:my-[16px] md:ml-[20px] md:text-[17px] md:font-semibold">
       {category.name}
      </h2>
      {productsByCategory[category.slug]?.[0] && (
       <img
        onClick={() => {
         router.push(`/results?search=${category.slug}`)
        }}
        className="mx-auto h-[285px]"
        src={productsByCategory[category.slug][0].thumbnail}
        alt={productsByCategory[category.slug][0].title}
       />
      )}
      <div className="flex w-[345px] md:my-[13px] md:items-center md:justify-evenly">
       {productsByCategory[category.slug]?.slice(1, 5).map((product) => (
        <div
         className="md:flex md:rounded md:border md:border-gray-300 md:bg-white md:hover:border-blue-600"
         key={product.id}
        >
         <img
          onClick={() => {
           router.push(`/results?search=${product.title}`)
          }}
          className="md:h-[65px] md:w-[65px]"
          src={product.thumbnail}
          alt={product.title}
         />
        </div>
       ))}
      </div>
     </div>
    ))}
   </div>
   <div className="hidden md:mx-auto md:block md:h-[421px] md:w-[1070px] md:rounded md:bg-white">
    <h2 className="ml-[20px] pb-[20px] pt-[20px] text-[18.80px] font-semibold">
     Categories
    </h2>
    <Slider {...settings}>
     {categories?.map((category) => (
      <CustomSlide key={category.slug} category={category} />
     ))}
    </Slider>
   </div>
   <footer className="hidden md:mt-[64px] md:flex md:h-[72.74px] md:items-center md:bg-[#fff]">
    <div className="mx-auto md:w-[1070px]">
     <nav>
      <ul>
       <li className="mb-[8px] mr-[16px] inline font-[-apple-system,roboto,arial,sans-serif] text-[12.60px] ">
        Trabaja para nosotros
       </li>
       <li className="mb-[8px] mr-[16px] inline font-[-apple-system,roboto,arial,sans-serif] text-[12.60px] ">
        Términos y Condiciones
       </li>
       <li className="mb-[8px] mr-[16px] inline font-[-apple-system,roboto,arial,sans-serif] text-[12.60px] ">
        Cómo cuidamos tu privacidad
       </li>
       <li className="mb-[8px] mr-[16px] inline font-[-apple-system,roboto,arial,sans-serif] text-[12.60px] ">
        Accesibilidad
       </li>
       <li className="mb-[8px] mr-[16px] inline font-[-apple-system,roboto,arial,sans-serif] text-[12.60px] ">
        Ayuda
       </li>
      </ul>
     </nav>
     <div>
      <small className="font-[-apple-system,roboto,arial,sans-serif] text-[12.64px] text-gray-500">
       Copyright © 2024-2025 Bazar Online Venezuela
      </small>
     </div>
    </div>
   </footer>
  </main>
 )
}
