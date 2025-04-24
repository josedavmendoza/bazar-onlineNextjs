import { Product } from '@/app/types/product'
import ProductListItem from './ProductListItem'

interface SearchResultsListProps {
 products: Product[]
 onItemClick: (id: string) => void
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
 products,
 onItemClick,
}) => {
 return (
  <div className="md:ml-[px] md:mt-[38.8px] md:grid md:h-full md:w-[743px] md:grid-cols-3 md:gap-[16px]">
   {products.map((product: Product) => (
    <ProductListItem
     key={product.id}
     product={product}
     onItemClick={onItemClick}
    />
   ))}
  </div>
 )
}

export default SearchResultsList
