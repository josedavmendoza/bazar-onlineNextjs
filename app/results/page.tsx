'use client'
import { useState, useEffect, useMemo } from 'react'
import BazarIcon from '../ui/BazarIcon'
import StarRating from '../ui/StarRating'
import { useRouter, useSearchParams } from 'next/navigation'

// Results component function
export default function Results() {
 const searchParams = useSearchParams()
 const param = searchParams.get('search')
 const [products, setProducts] = useState<Product[]>([])
 const [searchTerm, setSearchTerm] = useState('')
 const [categories, setCategories] = useState<string[]>([])
 const [brands, setBrands] = useState<string[]>([])
 const [rating, setRating] = useState<number[]>([])
 const router = useRouter()
 const sendTerm = (formData: any) => {
  setSearchTerm(formData.get('term'))
 }

 interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  image: string[]
 }

 const fetchProducts = async () => {
  try {
   const response = await fetch('/api')
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
   console.error('searchTerm is undefined')
  }
 }, [param])

 const filteredProducts = useMemo(() => {
  if (!searchTerm) return products

  const filteredProductsBySearch = products.filter((product) =>
   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return filteredProductsBySearch
 }, [products, searchTerm])

 useEffect(() => {
  if (!filteredProducts.length) return

  const productCategorySet = new Set(
   filteredProducts.map((product) => product.category)
  )
  const uniqueCategories = [...productCategorySet]
  setCategories(uniqueCategories)

  const productBrandSet = new Set(
   filteredProducts.map((product) => product.brand)
  )
  const uniqueBrands = [...productBrandSet]
  setBrands(uniqueBrands)

  const productRatingSet = new Set(
   filteredProducts.map((product) => product.rating)
  )
  const uniqueRating = [...productRatingSet]
  setRating(uniqueRating)
 }, [filteredProducts])

 const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
  const itemId = event.currentTarget.id
  router.push(`/details?id=${itemId}`)
  console.log(itemId)
 }

 return (
  <div>
   <header className="h-100 mt-5 flex items-center justify-evenly">
    <BazarIcon height={80} width={65} />
    <div className="mt-[20px]">
     <form
      action={sendTerm}
      className="mb-[15px] flex h-[40px] w-[270px] items-center justify-around rounded bg-gray-200 shadow"
     >
      <input
       className="max-w-[200px] bg-gray-200 text-base outline-none"
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
   <h1 className="mt-5 text-center text-lg font-semibold">
    Search results for "{searchTerm}": {filteredProducts.length}
   </h1>
   <section className="mt-5">
    <div className="flex items-center justify-evenly text-base font-bold">
     <div className="flex h-[40px] w-[150px] items-center justify-center bg-[#5f70b8cb]">
      <span>Categories - {categories.length}</span>
     </div>
     <div className=" flex h-[40px] w-[150px] items-center justify-center bg-red-600">
      <span>Brands - {brands.length}</span>
     </div>
    </div>
   </section>
   {filteredProducts.map((product: Product) => (
    <div
     key={product.id}
     id={product.id.toString()}
     className="mb-[20px] mt-[20px] flex cursor-pointer items-center justify-evenly"
     onClick={handleItemClick}
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
       <StarRating ratingProduct={product.rating} />
      </div>
     </div>
    </div>
   ))}
  </div>
 )
}
