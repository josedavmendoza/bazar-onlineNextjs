export default function Tag(categories: number, brands: number) {
 return (
  <div className="flex items-center justify-evenly text-base font-bold">
   <div className="flex h-[40px] w-[150px] items-center justify-center bg-[#5f70b8cb]">
    <span>Categories - {categories}</span>
   </div>
   <div className=" flex h-[40px] w-[150px] items-center justify-center bg-red-600">
    <span>Brands - {brands}</span>
   </div>
  </div>
 )
}
