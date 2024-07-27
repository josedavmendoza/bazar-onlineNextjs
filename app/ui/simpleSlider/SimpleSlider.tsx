import React from 'react'
import Slider from 'react-slick'

interface SliderProps {
 images: string[]
 title: string
}

export default function SimpleSlider({ images, title }: SliderProps) {
 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
 }

 return (
  <Slider {...settings}>
   {images.map((imageURL) => (
    <div>
     <img
      className="max-h-[20%] max-w-[20%] object-contain"
      src={imageURL}
      alt={title}
     />
    </div>
   ))}
  </Slider>
 )
}
