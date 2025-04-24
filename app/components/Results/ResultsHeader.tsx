interface ResultsHeaderProps {
 searchTerm: string
 filteredProductsCount: number
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
 searchTerm,
 filteredProductsCount,
}) => {
 return (
  <>
   <p className="text-center text-[16px] font-semibold md:hidden md:text-[26px]">
    Search results for "{searchTerm}": {filteredProductsCount}
   </p>
   <p className="hidden md:mt-[56px] md:block md:text-[18.80px] md:font-[600]">
    {searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}
   </p>
   <span className="hidden md:block md:text-[13px]">
    {filteredProductsCount} resultados
   </span>
  </>
 )
}

export default ResultsHeader
