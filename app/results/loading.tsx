import BazarIcon from '../components/home/BazarIcon'

export default function Loading() {
 return (
  <div className="flex h-[665px] items-center justify-center bg-[#f0f0f0] text-center md:h-[732px]">
   <p className="mt-0 block text-lg font-semibold">Loading...</p>
   <BazarIcon className="ml-[6px] animate-pulse" width={60} heigth={60} />
  </div>
 )
}
