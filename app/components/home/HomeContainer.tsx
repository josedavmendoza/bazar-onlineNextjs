// components/HomeContainer.tsx
'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import CategoryGrid from '../home/CategoryGrid'
import CategoryGridFallback from './CategoryGridFallback'

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
 const [isLoading, setIsLoading] = useState(true) // Nuevo estado de carga
 const router = useRouter()

 useEffect(() => {
  const fetchCategories = fetch(
   'https://dummyjson.com/products/categories'
  ).then((res) => {
   if (!res.ok) throw new Error('Network response was not ok')
   return res.json()
  })

  fetchCategories
   .then((categoriesData) => {
    setCategories(categoriesData)
    const productsByCategoryTemp: { [key: string]: Product[] } = {}
    const productPromises = categoriesData.map(async (category: Category) => {
     const productResponse = await fetch(category.url)
     if (!productResponse.ok) throw new Error('Network response was not ok')
     const productData = await productResponse.json()
     productsByCategoryTemp[category.slug] = productData.products
    })
    return Promise.all(productPromises).then(() => productsByCategoryTemp)
   })
   .then((productsByCategoryData) => {
    setProductsByCategory(productsByCategoryData)
   })
   .catch((error) => console.error('Error fetching data:', error))
   .finally(() => setIsLoading(false))
 }, [])

 const handleCategoryClick = (slug: string) => {
  router.push(`/results?search=${slug}`)
 }

 return (
  <div className="hidden md:mx-auto md:my-[42px] md:flex md:w-[1070px] md:justify-between">
   {isLoading ? (
    // Renderiza el fallback mientras isLoading sea true
    <>
     <CategoryGridFallback />
     <CategoryGridFallback />
     <CategoryGridFallback />
    </>
   ) : (
    // Renderiza los componentes reales cuando isLoading sea false
    categories
     ?.slice(3, 6)
     .map((category) => (
      <CategoryGrid
       key={category.slug}
       category={category}
       products={productsByCategory[category.slug]}
       onCategoryClick={handleCategoryClick}
      />
     ))
   )}
  </div>
 )
}

export default HomeContainer
