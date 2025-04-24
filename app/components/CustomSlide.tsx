import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
 id: number
 title: string
 thumbnail: string
}

interface CustomSlideProps {
 category: { slug: string; name: string }
 productsByCategory: { [key: string]: Product[] }
}

const CustomSlide: React.FC<CustomSlideProps> = ({
 category,
 productsByCategory,
}) => {
 const router = useRouter()
 return (
  <div
   onClick={() => {
    router.push(`/results?search=${category.slug}`)
   }}
   className="mb-[20px] ml-[8px] flex h-[97px] w-[248px] cursor-pointer items-center border border-gray-300 bg-white [border-radius:6px]"
  >
   {productsByCategory[category.slug]?.[0] && (
    <Image
     className="mx-[16px] h-[67px] w-[70px]"
     src={productsByCategory[category.slug][0].thumbnail}
     alt={productsByCategory[category.slug][0].title}
     width={70}
     height={67}
    />
   )}
   <p className="mx-[11px] text-[15px] font-semibold hover:text-sky-500">
    {category.name}
   </p>
  </div>
 )
}

export default CustomSlide
