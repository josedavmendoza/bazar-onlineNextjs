import StarRating from '../StarRating'

interface ProductInfoProps {
 title: string
 price: number
 stock: number
 rating: number
 discountPercentage: number
 dimensions: { width: number; height: number; depth: number }
 minimumOrderQuantity: number
 returnPolicy: string
 description: string
}

const ProductInfo: React.FC<ProductInfoProps> = ({
 title,
 price,
 stock,
 rating,
 discountPercentage,
 dimensions,
 minimumOrderQuantity,
 returnPolicy,
 description,
}) => {
 return (
  <section className="flex-wrap items-center justify-center md:absolute md:ml-[7px] md:mt-[22px] md:inline-block md:min-h-[500px] md:w-[322px] md:rounded-[8px] md:border md:border-gray-300">
   <h1 className="mb-[10px] mt-[15px] text-center text-[24px] font-black md:mb-0 md:ml-[12px] md:mt-[53px] md:text-start md:font-[Helvetica] md:text-[19px] md:font-[600] md:leading-[20px]">
    {title}
   </h1>
   <div className="flex items-center justify-center md:relative md:ml-[12px] md:block">
    <div className="mr-[30px]">
     <h2 className="text-center font-sans text-2xl font-black md:absolute md:mt-[31px] md:text-start md:font-sans md:text-[30px] md:font-[300]">
      US$ {price}
     </h2>
     <span className="text-[15px] font-black md:absolute md:top-[195px] md:text-[13px] md:font-semibold">
      {`(${stock})  Available`}
     </span>
    </div>
    <span className="hidden md:mr-[8px] md:inline md:text-[10.50px]">
     {rating}
    </span>
    <span className="hidden md:absolute md:left-[4px] md:top-[212px] md:block md:text-[25px] md:text-pink-600">
     -{discountPercentage}%
    </span>
    <div className="hidden md:absolute md:left-[150px] md:top-[195px] md:block md:text-[13px] md:font-semibold">
     Dimensions:
     <br />
     <span className="md:text-[12.50px] md:font-normal">{`Width: ${dimensions.width}" `}</span>
     <br />
     <span className="md:text-[12.50px] md:font-normal">{`Height: ${dimensions.height}"`}</span>
     <br />
     <span className="md:text-[12.50px] md:font-normal">{`Depth: ${dimensions.depth} "`}</span>
    </div>
    <span className="hidden md:absolute md:top-[280px] md:block md:text-[13px] md:font-semibold">
     Minimum Ordered Quantity:{` (${minimumOrderQuantity})`}
    </span>
    <span className="hidden md:absolute md:top-[305px] md:block md:text-[13px] md:font-medium md:text-[#3483fa]">
     {`"${returnPolicy}"`}
    </span>
    <StarRating
     ratingProduct={rating}
     className={'cursor-pointer text-[22px] md:inline-flex md:text-[15px]'}
    />
    <span className="hidden md:ml-[5px] md:inline md:text-[12px]">{`(${stock})`}</span>
   </div>
   <p className="mx-auto mt-[20px] w-[294px] text-[15px] md:mt-[52px] md:text-[13px]">
    {description}
   </p>
   <button
    className={`mx-auto mb-[40px] mt-[30px] block h-[60px] w-[250px] rounded-full bg-[#ee6c4d] text-xl font-medium shadow md:absolute md:left-[12px] md:top-[405px] md:h-[47px] md:w-[295px] md:rounded-[6px] md:text-[16px]`}
   >
    Add to Cart
   </button>
  </section>
 )
}

export default ProductInfo
