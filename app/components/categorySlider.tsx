import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-slick'
import '../slick.css'
import '../slick-theme.css'
import CustomSlide from './CustomSlide'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
   className={`${className} absolute !left-[-30px] top-[137px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[50%] bg-white text-center shadow-[0_1px_2px_0_rgb(0,0,0,12%)] hover:shadow-[0_8px_16px_0_rgb(0,0,0,10%)]`}
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
   className={`${className} absolute !right-[-30px] top-[137px] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[50%] bg-white text-center shadow-[0_1px_2px_0_rgb(0,0,0,12%)] hover:shadow-[0_8px_16px_0_rgb(0,0,0,10%)] `}
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

 useEffect(() => {
  const fetchCategoriesAndProducts = async () => {
   const response = await axios.get('https://dummyjson.com/products/categories')
   setCategories(response.data)

   const productsByCategoryTemp: { [key: string]: Product[] } = {}

   for (const category of response.data) {
    const productResponse = await axios.get(category.url)
    productsByCategoryTemp[category.slug] = productResponse.data.products
   }

   setProductsByCategory(productsByCategoryTemp)
  }

  fetchCategoriesAndProducts()
 }, [])

 console.log(productsByCategory)

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
 )
}
