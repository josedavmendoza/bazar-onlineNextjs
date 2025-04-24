import React from 'react'
import ProductCard from './ProductCard'

interface CategoryGridProps {
 category: { slug: string; name: string }
 products: { id: number; title: string; thumbnail: string }[]
 onCategoryClick: (slug: string) => void
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
 category,
 products,
 onCategoryClick,
}) => {
 return (
  <div className="cursor-pointer shadow md:h-[445px] md:w-[346px] md:bg-white md:[border-radius:6px]">
   <p className="md:my-[16px] md:ml-[20px] md:text-[17px] md:font-semibold">
    {category.name}
   </p>
   {products?.[0] && (
    <img
     onClick={() => onCategoryClick(category.slug)}
     className="mx-auto h-[285px]"
     src={products[0].thumbnail}
     alt={products[0].title}
    />
   )}
   <div className="flex w-[345px] md:my-[13px] md:items-center md:justify-evenly">
    {products
     ?.slice(1, 5)
     .map((product) => (
      <ProductCard
       product={product}
       searchQuery={product.title}
       key={product.id}
      />
     ))}
   </div>
  </div>
 )
}

export default CategoryGrid
