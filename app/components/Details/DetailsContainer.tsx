import { Product } from '@/app/types/product'
import { useEffect, useState } from 'react'
import ProductImageGallery from './ProductImageGallery'
import CustomPaging from './customPaging'
import ModalWindow from './modalWindow'
import ProductInfo from './ProductInfo'
import { useSearchParams } from 'next/navigation'

interface DetailsContainerProps {}

const DetailsContainer: React.FC<DetailsContainerProps> = ({}) => {
 return <DetailsContent />
}

function DetailsContent() {
 const searchParams = useSearchParams()
 const param = searchParams.get('id')

 const [productData, setProductData] = useState<Product | null>(null)
 const [isLoading, setLoading] = useState(false)
 const [error, setError] = useState<Error | null>(null)
 const [isFullScreen, setIsFullScreen] = useState(false)
 const [currentImageIndex, setCurrentImageIndex] = useState(0)

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   setError(null)

   try {
    if (param) {
     const response = await fetch(`/api/${param}`)
     if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
     }
     const data = await response.json()
     setProductData(data.data)
    }
   } catch (err) {
    console.error(err)
    setError(err as Error)
   } finally {
    setLoading(false)
   }
  }

  fetchData()
 }, [param])

 if (isLoading) {
  return (
   <div className="hidden text-center md:h-[540px] md:w-[1050px] md:bg-white">
    Loading...
   </div>
  )
 }

 if (error) {
  return (
   <div className="hidden text-center md:h-[540px] md:w-[1050px] md:bg-white">
    Error loading product details
   </div>
  )
 }

 if (!productData) {
  return (
   <div className="hidden text-center md:h-[540px] md:w-[1050px] md:bg-white">
    Product not found.
   </div>
  )
 }

 const handleOpenFullScreen = (index: number) => {
  setIsFullScreen(true)
  setCurrentImageIndex(index)
 }

 const handleCloseFullScreen = () => {
  setIsFullScreen(false)
 }

 return (
  <div className="md:mx-auto md:mt-[76px] md:h-[538px] md:w-[1050px] md:rounded-[4px] md:bg-white md:shadow-md">
   <div className="relative flex items-center justify-evenly md:hidden md:h-[503.98px] md:w-[700px]">
    <ProductImageGallery
     thumbnail={productData.thumbnail}
     images={productData.images}
     title={productData.title}
     onOpenFullScreen={handleOpenFullScreen}
    />
   </div>
   <CustomPaging
    images={productData.images}
    title={productData.title}
    handleOpenFullScreen={handleOpenFullScreen}
   />
   <hr className="hidden md:absolute md:ml-[24px] md:block md:w-[626px]" />
   {isFullScreen && (
    <ModalWindow
     handleCloseFullScreen={handleCloseFullScreen}
     currentImageIndex={currentImageIndex}
     images={productData.images}
     title={productData.title}
    />
   )}
   <ProductInfo
    title={productData.title}
    price={productData.price}
    stock={productData.stock}
    rating={productData.rating}
    discountPercentage={productData.discountPercentage}
    dimensions={productData.dimensions}
    minimumOrderQuantity={productData.minimumOrderQuantity}
    returnPolicy={productData.returnPolicy}
    description={productData.description}
   />
  </div>
 )
}

export default DetailsContainer
