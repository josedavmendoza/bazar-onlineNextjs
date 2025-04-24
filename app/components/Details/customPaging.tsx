import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

interface CustomSlidesProps {
 image: string
 title: string
 handleOpenFullScreen: (index: number) => void
 index: number
}

const CustomSlide = ({
 image,
 title,
 handleOpenFullScreen,
 index,
}: CustomSlidesProps) => {
 return (
  <div className="flex justify-center">
   <Image
    className="cursor-pointer md:mt-[12px] md:h-[480px] md:w-[100%] md:rounded-[4px] md:object-contain"
    height={500}
    width={500}
    src={image}
    alt={title}
    key={image}
    onClick={() => handleOpenFullScreen(index)}
   />
  </div>
 )
}

interface CustomPagingProps {
 images: string[]
 title: string
 handleOpenFullScreen: (index: number) => void
}

export default function CustomPaging({
 images,
 title,
 handleOpenFullScreen,
}: CustomPagingProps) {
 const [currentSlide, setCurrentSlide] = useState<number>(0)
 const sliderRef = useRef<Slider>(null)
 const settings = {
  customPaging: function (i: number) {
   return (
    <a>
     <Image
      className="mb-[8px] h-[50px] w-[50px] cursor-pointer rounded-[4px] border border-gray-300 object-contain hover:border-[2px] hover:border-[#3483fa]"
      src={images[i]}
      alt={`Thumbnail ${i + 1}`}
      onMouseEnter={() => {
       setCurrentSlide(i)
       if (sliderRef.current) sliderRef.current.slickGoTo(i)
      }}
      onClick={() => handleOpenFullScreen(i)}
      height={500}
      width={500}
     />
    </a>
   )
  },
  dots: true,
  dotsClass: 'slick-thumb',
  infinite: false,
  speed: 500,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  beforeChange: (current: number, next: number) => setCurrentSlide(next),
  arrows: false,
 }
 return (
  <div className="relative hidden items-center justify-evenly md:inline-block md:h-[503.98px] md:w-[700px]">
   <Slider {...settings} ref={sliderRef} initialSlide={currentSlide}>
    {images.map((image, index) => (
     <CustomSlide
      key={image}
      image={image}
      title={title}
      handleOpenFullScreen={handleOpenFullScreen}
      index={index}
     />
    ))}
   </Slider>
  </div>
 )
}
