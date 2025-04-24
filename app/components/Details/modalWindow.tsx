import Image from 'next/image'
import { CgClose } from 'react-icons/cg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-slick'
import { useState, useEffect } from 'react'

interface ModalWindowProps {
 handleCloseFullScreen: () => void
 currentImageIndex: number
 images: string[]
 title: string
}

function SamplePrevArrow(props: any) {
 const { className, style, onClick } = props
 return (
  <div
   className={`${className} absolute !left-[40px] !top-[55%] !flex h-[40px] w-[40px]  cursor-pointer items-center justify-center !rounded-none bg-[rgb(0,0,0,.25)] hover:!bg-[rgb(0,0,0,.25)]`}
   onClick={onClick}
  >
   <IoIosArrowBack
    style={{
     ...style,
     color: 'white',
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
   className={`${className} absolute !right-[40px] !top-[55%] !flex h-[40px] w-[40px]  cursor-pointer items-center justify-center !rounded-none bg-[rgb(0,0,0,.25)] hover:!bg-[rgb(0,0,0,.25)]`}
   onClick={onClick}
  >
   <IoIosArrowForward
    style={{
     ...style,
     color: 'white',
     fontSize: '30px',
    }}
   />
  </div>
 )
}

export default function ModalWindow({
 handleCloseFullScreen,
 currentImageIndex,
 images,
 title,
}: ModalWindowProps) {
 const [currentSlide, setCurrentSlide] = useState(currentImageIndex)

 useEffect(() => {
  setCurrentSlide(currentImageIndex)
 }, [currentImageIndex])

 var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
  beforeChange: (current: number, next: number) => {
   setCurrentSlide(next)
  },
  responsive: [
   {
    breakpoint: 768,
    settings: {
     arrows: false,
     dots: true,
     dotsClass: 'slick-dots',
     appendDots: (dots: number) => (
      <div
       className="absolute left-1/2 -translate-x-[50%] transform"
       style={{
        borderRadius: '20px',
        padding: '10px',
       }}
      >
       <ul className="flex h-[16px] items-center justify-center">{dots}</ul>
      </div>
     ),
     customPaging: function (i: number) {
      return (
       <div
        style={{
         height: '10px',
         width: '10px',
         backgroundColor: i === currentSlide ? 'white' : 'gray',
         borderRadius: '20px',
        }}
       />
      )
     },
    },
   },
  ],
 }

 return (
  <div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-75">
   <div className="absolute left-[42px] top-[38px] h-[24px] w-[43.81px] rounded-[12px] bg-[rgba(0,0,0,.25)] text-center text-[16px] text-white">
    {currentSlide + 1}/{images.length}
   </div>
   <button
    onClick={handleCloseFullScreen}
    className="0 fixed right-[40px] top-[33px] z-[51]"
   >
    <CgClose className="h-[32px] w-[32px] bg-[rgba(0,0,0,.25)] text-white" />
   </button>
   <div className="relative top-[100px] md:static md:top-0">
    <Slider {...settings} initialSlide={currentImageIndex}>
     {images.map((imageURL, index) => (
      <div className="mt-[50px]" key={index}>
       <Image
        className="mx-auto h-[360px] w-[auto] md:h-[580px] md:w-[100%] md:object-contain"
        height={600}
        width={600}
        src={imageURL}
        alt={title}
       />
      </div>
     ))}
    </Slider>
   </div>
  </div>
 )
}
