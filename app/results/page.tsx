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
   <header className="mt-[10px] flex h-[85px] items-center justify-evenly">
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
   <h1 className="text-center text-[16px] font-semibold">
    Search results for "{searchTerm}": {filteredProducts.length}
   </h1>
   <section className="mb-[15px] mt-[5px]">
    <div className="flex items-center justify-evenly text-base font-bold">
     <div className="flex h-[35px] w-[150px] items-center justify-center bg-[#7382bf]">
      <span className="text-sm  font-extrabold">
       Categories - {categories.length}
      </span>
     </div>
     <div className=" flex h-[35px] w-[150px] items-center justify-center bg-[#ee6c4d]">
      <span className="text-sm font-extrabold">Brands - {brands.length}</span>
     </div>
    </div>
   </section>
   {filteredProducts.map((product: Product) => (
    <div
     key={product.id}
     id={product.id.toString()}
     className="mt-[11px] flex cursor-pointer items-center justify-evenly"
     onClick={handleItemClick}
    >
     <img
      className="h-[120px] w-[120px] rounded-full"
      src={product.thumbnail}
      alt={product.title}
     />
     <div className="w-205">
      <h1 className="max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[22px] font-extrabold">
       {product.title}
      </h1>
      <p className="line-clamp-4 h-[90px] max-w-[200px] text-[15px] font-light">
       {product.description}
      </p>
      <div className="flex items-center justify-between">
       <span className="inline font-sans text-[22px] font-black">
        {product.price}
       </span>
       <StarRating ratingProduct={product.rating} size={20} />
      </div>
     </div>
    </div>
   ))}
  </div>
 )
}
