'use client'
import { useState, useEffect, useMemo, Suspense } from 'react'
import { Product } from '@/app/types/product'
import { useRouter, useSearchParams } from 'next/navigation'
import FilterSidebarFallback from './filterSidebarFallback'
import SearchResultsListFallback from './searchResultslistFallback'
import FilterSidebar from '../Results/FilterSidebar'
import SearchResultsList from '../Results/SearchResultsList'

interface ResultsContainerProps {
 initialSearchTerm: string | null
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
 initialSearchTerm,
}) => {
 const [products, setProducts] = useState<Product[]>([])
 const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '')
 const [categories, setCategories] = useState<string[]>([])
 const [brands, setBrands] = useState<string[]>([])
 const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
  {}
 )
 const [brandingCount, setBrandingCount] = useState<Record<string, number>>({})
 const [isLoading, setIsLoading] = useState(true)
 const router = useRouter()

 const fetchProducts = async () => {
  setIsLoading(true)
  try {
   const response = await fetch('/api')
   if (response) {
    const { data } = await response.json()
    if (data && data.products) {
     setProducts(data.products)
    }
   }
  } catch (error) {
   console.error('Error fetching products:', error)
   // Consider setting an error state here
  } finally {
   setIsLoading(false)
  }
 }

 useEffect(() => {
  fetchProducts()
 }, [])

 useEffect(() => {
  if (initialSearchTerm) {
   setSearchTerm(initialSearchTerm)
  }
 }, [initialSearchTerm])

 const filteredProducts = useMemo(() => {
  if (!searchTerm) return products
  const lowerSearchTerm = searchTerm.toLowerCase()
  return products.filter(
   (product) =>
    product.title.toLowerCase().includes(lowerSearchTerm) ||
    product.category.toLowerCase().includes(lowerSearchTerm) ||
    (product.brand && product.brand.toLowerCase().includes(lowerSearchTerm))
  )
 }, [products, searchTerm])

 useEffect(() => {
  if (!filteredProducts.length) return

  const productCategorySet = new Set(
   filteredProducts.map((product) => product.category)
  )
  setCategories([...productCategorySet])

  const counts: Record<string, number> = {}
  filteredProducts.forEach((product) => {
   counts[product.category] = (counts[product.category] || 0) + 1
  })
  setCategoryCounts(counts)

  const hasBrands = filteredProducts.some((product) => product.brand)
  if (hasBrands) {
   const productBrandSet = new Set(
    filteredProducts.map((product) => product.brand)
   )
   setBrands([...productBrandSet])
   const brandCount: Record<string, number> = {}
   filteredProducts.forEach((product) => {
    if (product.brand) {
     brandCount[product.brand] = (brandCount[product.brand] || 0) + 1
    }
   })
   setBrandingCount(brandCount)
  } else {
   setBrands([])
   setBrandingCount({})
  }
 }, [filteredProducts])

 const handleItemClick = (id: string) => {
  router.push(`/details?id=${id}`)
  console.log('Item clicked:', id)
 }

 const handleCategoryClick = (category: string) => {
  router.push(`/results?search=${category}`)
 }

 const handleBrandClick = (brand: string) => {
  router.push(`/results?search=${brand}`)
 }

 return (
  <div className="md:mx-auto md:mt-[65.59px] md:flex md:w-[1137.78px]">
   {isLoading ? (
    <>
     <FilterSidebarFallback />
     <section className="md:flex md:w-[744px] md:flex-col">
      <SearchResultsListFallback />
     </section>
    </>
   ) : (
    <>
     <FilterSidebar
      filteredProductsResults={filteredProducts}
      searchTerm={searchTerm}
      categories={categories}
      categoryCounts={categoryCounts}
      brands={brands}
      brandingCount={brandingCount}
      onCategoryClick={handleCategoryClick}
      onBrandClick={handleBrandClick}
     />
     <section className="md:flex md:w-[744px] md:flex-col">
      <SearchResultsList
       products={filteredProducts}
       onItemClick={handleItemClick}
      />
     </section>
    </>
   )}
  </div>
 )
}

export default ResultsContainer
