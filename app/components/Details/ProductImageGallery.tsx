import Image from 'next/image'

interface ProductImageGalleryProps {
 thumbnail: string
 images: string[]
 title: string
 onOpenFullScreen: (index: number) => void
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
 thumbnail,
 images,
 title,
 onOpenFullScreen,
}) => {
 return (
  <div className="relative flex items-center justify-evenly md:hidden md:h-[503.98px] md:w-[700px]">
   <Image
    className="h-[180px] w-[180px] cursor-pointer rounded-full md:absolute md:right-0 md:h-[500px] md:w-[600px] md:rounded-none"
    height={503.98}
    width={680}
    src={thumbnail}
    alt={title}
    onClick={() => onOpenFullScreen(0)}
   />
   <div className="flex-wrap md:ml-[24px] md:mt-[72.75px]">
    {images.map((imageURL, index) => (
     <Image
      className="flex cursor-pointer rounded-full md:mb-[8px] md:h-[50px] md:w-[50px] md:rounded-[4px] md:border md:border-gray-400"
      height={75}
      width={75}
      src={imageURL}
      alt={title}
      key={imageURL}
      onClick={() => onOpenFullScreen(index)}
     />
    ))}
   </div>
  </div>
 )
}

export default ProductImageGallery
