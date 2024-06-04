import Lupa from './Lupa'

export default function Input({
 measure = 'h-[50px] w-[310px]',
 lensWidth = 25,
 lensHeight = 25,
 fontSize = 'text-xl',
 value = 'Buscar',
}) {
 return (
  <div
   className={`mb-[15px] flex ${measure} shadow" items-center justify-evenly rounded bg-gray-200`}
  >
   <input
    className={`bg-gray-200 outline-none ${fontSize} `}
    type="text"
    placeholder="laptops,smartphone,tablets... "
    defaultValue={value}
   />
   <Lupa width={lensWidth} height={lensHeight} />
   {/* <svg
   xmlns="http://www.w3.org/2000/svg"
   width={25}
   height={25}
   fill="none"
   viewBox="0 0 24 24"
   {...props}
  >
   <g stroke="#333" strokeWidth={1.8}>
    <path d="M19.96 11.48a8.45 8.45 0 0 1-2.458 5.971 8.438 8.438 0 0 1-6.022 2.51 8.48 8.48 0 1 1 8.48-8.48Z" />
    <path strokeLinecap="round" d="m18.155 18.155 3.732 3.732" />
   </g>
  </svg> */}
  </div>
 )
}
