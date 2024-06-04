import StarRating from './StarRating'

export default function Card() {
 return (
  <div className="mt-[25px] flex items-center justify-evenly">
   <img
    className="h-[150px] w-[150px] rounded-full"
    src="../yop.jpg"
    alt="imagen de muestra"
   />
   <div className="w-[205px]">
    <h1 className="text-2xl font-extrabold">iPhone X</h1>
    <p className="font-light">
     SIM-Free,Model A19211 6.5-inch Super Retina HD display with OLED technology
     A12 Bionic chip with ...
    </p>
    <div className="flex justify-between">
     <span className="inline font-sans text-2xl font-black">899$</span>
     <StarRating />
    </div>
   </div>
  </div>
 )
}
