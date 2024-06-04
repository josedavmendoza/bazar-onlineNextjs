export default function Button({
 measures = 'h-[40px] w-[170px]',
 name = 'Buscar',
 fontSize = 'text-2xl',
}) {
 return (
  <div className="flex justify-center">
   <button
    className={`mb-[40px] mt-[10px] ${measures} rounded-full bg-red-600 ${fontSize} shadow`}
   >
    {name}
   </button>
  </div>
 )
}
