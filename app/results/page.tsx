'use client'
import { useState, useEffect } from 'react'
import BazarIcon from '../ui/BazarIcon'
import Tag from '../ui/Tag'
import StarRating from '../ui/StarRating'
import { useSearchParams } from 'next/navigation'
import Lupa from '../ui/Lupa'

// Results component function
export default function Results() {
 const searchParams = useSearchParams()
 const param = searchParams.get('search')
 const [products, setProducts] = useState([])
 const [searchTerm, setSearchTerm] = useState('')

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
   setSearchTerm(param)
  } else {
   // Handle the case where router.query is undefined
   console.error('router.query is undefined')
  }
 }, [param])

 const filterProducts = (products: Product[], searchTerm: string) => {
  if (!searchTerm) return products // No search term, return all products

  const filteredProducts = products.filter((product) =>
   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return filteredProducts
 }

 return (
  <div>
   <header className="h-100 mt-5 flex items-center justify-evenly">
    <BazarIcon height={80} width={65} />
    <div className="mt-[20px]">
     <div
      className={`shadow" mb-[15px] flex h-[40px] w-[270px] items-center justify-evenly rounded bg-gray-200`}
     >
      <input
       className={`bg-gray-200 text-base outline-none `}
       type="text"
       placeholder="laptops,smartphone,tablets... "
       value={searchTerm}
       onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(event.target.value)
       }
      />
      <Lupa width={25} height={25} />
     </div>
    </div>
   </header>
   <h1 className="mt-5 text-center text-lg font-semibold">
    Resultados de búsqueda de "{searchTerm}":
   </h1>
   <section className="mt-5">
    <Tag items="smartphones" itemsNum={5} types="fragances" typesNum={2} />
   </section>
   {filterProducts(products, searchTerm)?.map((product: Product) => (
    <div
     key={product.id}
     className="mb-[20px] mt-[20px] flex items-center justify-evenly"
    >
     <img
      className="h-[150px] w-[150px] rounded-full"
      src={product.thumbnail}
      alt={product.title}
     />
     <div className="w-205">
      <h1 className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-extrabold">
       {product.title}
      </h1>
      <p className="max-w-[200px] overflow-ellipsis font-light">
       {product.description}
      </p>
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
