'use client'
import { useState, useEffect } from 'react'
import BazarIcon from '../ui/BazarIcon'
import Input from '../ui/Input'
import Tag from '../ui/Tag'
import Card from '../ui/Card'
import StarRating from '../ui/StarRating'
import { useSearchParams } from 'next/navigation'

// Results component function
export default function Results() {
 const searchParams = useSearchParams()
 const param = searchParams.get('search')
 const [products, setProducts] = useState([])
 const [search, setSearch] = useState('')

 interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
 }

 const fetchProducts = async () => {
  try {
   const response = await fetch('http://localhost:3000/api')
   if (response) {
    const { data } = await response.json()
    console.log(data)
    if (data) setProducts(data.products)
   }
  } catch (error) {
   console.log(error)
  }
 }

 //Fetch products on component mount
 useEffect(() => {
  fetchProducts()
 }, [])

 // Handle search term from query parameter
 useEffect(() => {
  if (param) {
   setSearch(param)
  } else {
   // Handle the case where router.query is undefined
   console.error('router.query is undefined')
  }
 }, [param])

 return (
  <div>
   <header className="h-100 mt-5 flex items-center justify-evenly">
    <BazarIcon height={80} width={65} />
    <div className="mt-[20px]">
     <Input
      measure={'h-[40px] w-[270px]'}
      lensHeight={25}
      lensWidth={25}
      fontSize="text-base"
      value={param}
     />
    </div>
   </header>
   <h1 className="mt-5 text-center text-lg font-semibold">
    Resultados de búsqueda de "{search}":
   </h1>
   <section className="mt-5">
    <Tag items="smartphones" itemsNum={5} types="fragances" typesNum={2} />
   </section>
   <Card />
   {products?.map((product: Product) => (
    <div key={product.id} className="mt-25 flex items-center justify-evenly">
     <img
      className="h-150 w-150 rounded-full"
      src={product.thumbnail}
      alt={product.title}
     />
     <div className="w-205">
      <h1 className="text-2xl font-extrabold">{product.title}</h1>
      <p className="max-w- font-light">{product.description}</p>
      <div className="flex justify-between">
       <span className="inline font-sans text-2xl font-black">
        {product.price}
       </span>
       <StarRating />
      </div>
     </div>
    </div>
   ))}
  </div>
 )
}