import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
 product: { id: number; title: string; thumbnail: string }
 searchQuery: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, searchQuery }) => {
 const router = useRouter()

 const handleClick = () => {
  router.push(`/results?search=${searchQuery}`)
 }

 return (
  <div className="cursor-pointer md:flex md:rounded md:border md:border-gray-300 md:bg-white md:hover:border-blue-600">
   <img
    className="md:h-[65px] md:w-[65px]"
    src={product.thumbnail}
    alt={product.title}
    onClick={handleClick}
   />
  </div>
 )
}

export default ProductCard
