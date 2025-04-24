import React from 'react'

interface FilterBrandProps {
 brands: string[]
 brandingCount: Record<string, number>
 onBrandClick: (brand: string) => void
}

const FilterBrand: React.FC<FilterBrandProps> = ({
 brands,
 brandingCount,
 onBrandClick,
}) => {
 return (
  <div className="flex h-[35px] w-[150px] items-center justify-center bg-[#ee6c4d] md:block md:bg-transparent">
   <span className="text-sm font-extrabold md:mb-[10px] md:block md:font-[Helvetica] md:text-[14.60px] md:font-[600]">
    Brands - {brands.length}
   </span>
   {brands.map((brand) => (
    <span
     className="hidden cursor-pointer hover:underline md:block md:text-[13px] md:font-[400]"
     onClick={() => onBrandClick(brand)}
    >
     {brand} ({brandingCount[brand] || 0})
    </span>
   ))}
  </div>
 )
}

export default FilterBrand
