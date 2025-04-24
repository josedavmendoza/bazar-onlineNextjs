import Image from 'next/image'
import StarRating from '../StarRating'

interface ProductListItemProps {
 product: {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
  brand: string
 }

 onItemClick: (id: string) => void
}

const ProductListItem: React.FC<ProductListItemProps> = ({
 product,
 onItemClick,
}) => {
 return (
  <div
   key={product.id}
   id={product.id.toString()}
   className="mt-[11px] flex cursor-pointer items-center justify-evenly md:mt-0 md:block md:h-[427.85px] md:w-[240px] md:rounded-md md:bg-white md:shadow-sm md:hover:shadow-md"
   onClick={(event) => onItemClick(event.currentTarget.id)}
  >
   <Image
    className="h-[120px] w-[120px] rounded-full md:h-[240px] md:w-[240px] md:rounded-none"
    src={product.thumbnail}
    alt={product.title}
    width={240}
    height={240}
   />
   <div className="w-205  md:h-[183.85px] md:w-[240px] md:px-[16px]">
    <h1 className="text-[22px] font-extrabold md:mt-[16px] md:max-w-[200px] md:font-sans md:text-[14px] md:font-semibold">
     {product.brand || product.title}
    </h1>
    <p className="line-clamp-4 h-[90px] max-w-[200px]  text-[15px] font-light md:mb-[4px] md:line-clamp-3 md:h-[62px] md:text-[14px]">
     {product.description}
    </p>
    <div className="flex items-center justify-between">
     <span className="inline text-[20px] font-bold md:mt-[12px] md:text-[22.80px] md:font-[590]">
      US$ {product.price}
     </span>
     <StarRating
      ratingProduct={product.rating}
      className={'cursor-pointer text-[18px]  md:inline-flex md:text-[15px]'}
     />
    </div>
   </div>
  </div>
 )
}

export default ProductListItem
