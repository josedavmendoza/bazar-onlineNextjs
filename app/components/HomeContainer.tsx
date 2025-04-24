'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryGrid from './CategoryGrid'

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

const HomeContainer: React.FC = () => {
 const [categories, setCategories] = useState<Category[]>([])
 const [productsByCategory, setProductsByCategory] = useState<{
  [key: string]: Product[]
 }>({})
 const router = useRouter()

 useEffect(() => {
  const fetchCategoriesAndProducts = async () => {
   try {
    const response = await fetch('https://dummyjson.com/products/categories')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    setCategories(data)

    const productsByCategoryTemp: { [key: string]: Product[] } = {}
    for (const category of data) {
     const productResponse = await fetch(category.url)
     if (!productResponse.ok) throw new Error('Network response was not ok')
     const productData = await productResponse.json()
     productsByCategoryTemp[category.slug] = productData.products
    }
    setProductsByCategory(productsByCategoryTemp)
   } catch (error) {
    console.error('Error fetching data:', error)
   }
  }
  fetchCategoriesAndProducts()
 }, [])

 const handleCategoryClick = (slug: string) => {
  router.push(`/results?search=${slug}`)
 }

 return (
  <div className="hidden md:mx-auto md:my-[42px] md:flex md:w-[1070px] md:justify-between">
   {categories
    ?.slice(3, 6)
    .map((category) => (
     <CategoryGrid
      key={category.slug}
      category={category}
      products={productsByCategory[category.slug]}
      onCategoryClick={handleCategoryClick}
     />
    ))}
  </div>
 )
}

export default HomeContainer
