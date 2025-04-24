import { Product } from '@/app/types/product'
import FilterCategory from './FIlterCategory'
import FilterBrand from './FilterBrand'
import ResultsHeader from './ResultsHeader'

interface FilterSidebarProps {
 filteredProductsResults: Product[]
 searchTerm: string
 categories: string[]
 categoryCounts: Record<string, number>
 brands: string[]
 brandingCount: Record<string, number>
 onCategoryClick: (category: string) => void
 onBrandClick: (brand: string) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
 filteredProductsResults,
 searchTerm,
 categories,
 categoryCounts,
 brands,
 brandingCount,
 onCategoryClick,
 onBrandClick,
}) => {
 return (
  <aside className="md:ml-[10px] md:h-full md:w-[293.99px]">
   <ResultsHeader
    searchTerm={searchTerm}
    filteredProductsCount={filteredProductsResults.length}
   />
   <section className="mb-[15px] mt-[5px]">
    <div className="flex items-center justify-evenly text-base font-bold md:mt-6 md:block">
     <FilterCategory
      categories={categories}
      categoryCounts={categoryCounts}
      onCategoryClick={onCategoryClick}
     />
     {brands && (
      <FilterBrand
       brands={brands}
       brandingCount={brandingCount}
       onBrandClick={onBrandClick}
      />
     )}
    </div>
   </section>
  </aside>
 )
}

export default FilterSidebar
