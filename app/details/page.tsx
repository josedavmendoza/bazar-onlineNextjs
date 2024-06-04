import BazarIcon from '../ui/BazarIcon'
import Button from '../ui/Button'
import Input from '../ui/Input'
import StarRating from '../ui/StarRating'

export default function Details() {
 return (
  <div>
   <header className="mt-[15px] flex h-[100px] items-center justify-evenly">
    <BazarIcon height={80} width={65} />
    <div className="mt-[12px]">
     <Input
      measure={'h-[40px] w-[270px]'}
      lensHeight={25}
      lensWidth={25}
      fontSize="text-base"
     />
    </div>
   </header>
   <div className="flex items-center justify-evenly">
    <img
     className="h-[210px] w-[210px] rounded-full"
     src="../yop.jpg"
     alt="itemImage"
    />
    <div className=" flex-wrap">
     <img
      className="flex h-[80px] w-[80px] rounded-full"
      src="../yop.jpg"
      alt="itemImage"
     />
     <img
      className="flex h-[80px] w-[80px] rounded-full"
      src="../yop.jpg"
      alt="itemImage"
     />
     <img
      className=" h-[80px] w-[80px] rounded-full"
      src="../yop.jpg"
      alt="itemImage"
     />
    </div>
   </div>
   <section className="mb-[60px]  flex-wrap items-center justify-center ">
    <h1 className="mb-[15px] mt-[15px] text-center text-3xl font-extrabold">
     iPhone X - Apple
    </h1>
    <div className="flex items-center justify-center">
     <div className="mr-[30px]">
      <h2 className="text-center font-sans text-2xl font-black">899$</h2>
      <span>2 disponibles</span>
     </div>
     <StarRating />
    </div>
    <p className="mx-auto mt-[40px] w-[320px] ">
     SIM-Free,Model A19211 6.5-inch Super Retina HD display with OLED technology
     A12 Bionic chip with ...
    </p>
   </section>
   <Button name="Comprar" measures="h-[80px] w-[320px]" fontSize="text-4xl" />
  </div>
 )
}
