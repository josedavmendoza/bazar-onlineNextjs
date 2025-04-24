interface FilterCategoryProps {
 categories: string[]
 categoryCounts: Record<string, number>
 onCategoryClick: (category: string) => void
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
 categories,
 categoryCounts,
 onCategoryClick,
}) => {
 return (
  <div className="flex h-[35px] w-[150px] items-center justify-center bg-[#7382bf] md:mb-[30px] md:block md:h-full md:w-full md:bg-transparent">
   <span className="text-sm font-extrabold md:mb-[10px] md:block md:font-[Helvetica] md:text-[14.60px] md:font-[600]">
    Categories - {categories.length}
   </span>
   {categories.map((category) => (
    <span
     onClick={() => onCategoryClick(category)}
     className="hidden hover:underline md:block md:cursor-pointer md:text-[13px] md:font-[400]"
    >
     {category.toString().charAt(0).toUpperCase() + category.slice(1)} (
     {categoryCounts[category] || 0})
    </span>
   ))}
  </div>
 )
}

export default FilterCategory
