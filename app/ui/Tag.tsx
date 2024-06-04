export default function Tag({ ...props }) {
 return (
  <div className="flex items-center justify-evenly text-base font-bold">
   <div className="flex h-[40px] w-[150px] items-center justify-center bg-[#5f70b8cb]">
    <span>
     {props.items} - {props.itemsNum}
    </span>
   </div>
   <div className=" flex h-[40px] w-[150px] items-center justify-center bg-red-600">
    <span>
     {props.types} - {props.typesNum}
    </span>
   </div>
  </div>
 )
}
