// components/categorySlider.tsx
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CustomSlide from '../home/CustomSlide'
import SliderSuspense from '../home/SliderSuspense'

interface Product {
 id: number
 title: string
 thumbnail: string
}

interface Category {
 slug: string
 name: string
 url: string
}

function SamplePrevArrow(props: any) {
 const { className, style, onClick } = props
 return (
  <div
   className={`${className} absolute !left-[-30px] top-[137px] !flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[50%] !bg-white text-center shadow-[0_1px_2px_0_rgb(0,0,0,12%)] hover:shadow-[0_8px_16px_0_rgb(0,0,0,10%)]`}
   onClick={onClick}
  >
   <IoIosArrowBack
    style={{
     ...style,
     color: 'skyblue',
     fontSize: '30px',
    }}
   />
  </div>
 )
}

function SampleNextArrow(props: any) {
 const { className, style, onClick } = props
 return (
  <div
   className={`${className} absolute !right-[-30px] top-[125px] !flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[50%] !bg-white text-center shadow-[0_1px_2px_0_rgb(0,0,0,12%)] hover:shadow-[0_8px_16px_0_rgb(0,0,0,10%)]`}
   onClick={onClick}
  >
   <IoIosArrowForward
    style={{
     ...style,
     color: 'skyblue',
     fontSize: '30px',
    }}
   />
  </div>
 )
}

export default function CategorySlider() {
 const [categories, setCategories] = useState<Category[]>([])
 const [productsByCategory, setProductsByCategory] = useState<{
  [key: string]: Product[]
 }>({})
 const [isLoading, setIsLoading] = useState(true) // Nuevo estado de carga

 useEffect(() => {
  const fetchCategories = axios.get('https://dummyjson.com/products/categories')

  Promise.all([fetchCategories])
   .then(([categoriesResponse]) => {
    setCategories(categoriesResponse.data)
    const productsByCategoryTemp: { [key: string]: Product[] } = {}
    const productPromises = categoriesResponse.data.map(
     async (category: Category) => {
      const productResponse = await axios.get(category.url)
      productsByCategoryTemp[category.slug] = productResponse.data.products
     }
    )
    return Promise.all(productPromises).then(() => productsByCategoryTemp)
   })
   .then((productsByCategoryData) => {
    setProductsByCategory(productsByCategoryData)
   })
   .catch((error) => console.error('Error fetching data:', error))
   .finally(() => setIsLoading(false))
 }, [])

 const settings = {
  centerMode: false,
  infinite: false,
  slidesToShow: 4,
  speed: 500,
  rows: 3,
  slidesPerRow: 1,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
 }

 return (
  <div>
   {isLoading ? (
    // Renderiza el fallback mientras isLoading sea true
    <SliderSuspense />
   ) : (
    // Renderiza el componente real cuando isLoading sea false
    <div className="hidden md:mx-auto md:block md:h-[421px] md:w-[1070px] md:rounded-md md:bg-white md:shadow">
     <p className="ml-[20px] pb-[20px] pt-[20px] text-[18.80px] font-semibold">
      Categories
     </p>
     <Slider {...settings}>
      {categories?.map((category) => (
       <CustomSlide
        key={category.slug}
        category={category}
        productsByCategory={productsByCategory}
       />
      ))}
     </Slider>
    </div>
   )}
  </div>
 )
}
